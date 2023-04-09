import express from 'express';
import { accountCreationUser } from '@src/services/User-Services';
import { Logger } from "tslog";
import { appendFileSync } from "fs";
import { decodeURLToNumber, isParticipantIdApproved } from '@src/services/PendingAccount-Service';

const router = express.Router();
const app = express();

//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});

router.route("/:id")
  .get(async (req, res) => {
    const id  = req.params.id;
    const decodedNum = decodeURLToNumber(id);
    if (decodedNum === null) {
      res.status(400).send("Invalid ID");
      logger.error("\nERROR(Invalid ID) => id passed: " + id + " decoded to: " + decodedNum)
      return;
    }
    const approvedstatus = await isParticipantIdApproved(decodedNum);
    if (!approvedstatus) {
      logger.error("\nERROR => id passed: " + id + " decoded to: " + decodedNum)
      res.status(404).send("Part not found");
      return;
    }
    logger.info("\nid passed: " + id + " decoded to: " + decodedNum)
    res.locals.partIDnum = decodedNum; // store decoded ID in locals object for access in other routes
    res.send(true);
  })

  router.route('').post((req, res) => {
    const partIDnum = res.locals.partIDnum; // retrieve decoded ID from locals object
    if (!partIDnum) {
      res.status(400).send("No ID provided");
      return;
    }
    const data = req.body;
    accountCreationUser(
      partIDnum,
      data['surname'],
      data['givenName1'],
      data['givenName2'],
      data['password'],
      data['email'],
      data['question1'],
      data['answer1'],
      data['question2'],
      data['answer2'],
      data['question3'],
      data['answer3']
    );
    logger.info("\nAccount creation request data: \n" + data)
    res.send(true);
  });

module.exports = router;
