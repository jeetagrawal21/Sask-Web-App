import express from 'express';
import { Request, Response } from 'express';
import { Logger } from "tslog";
import { appendFileSync } from "fs";
import { insertPendingUser, isParticipantIdPending, getUsersAndPendingStatus, deleteApprovedUser, insertApprovedUser, deletePendingUser, getAllAprovedUsers} from '@src/services/PendingAccount-Service'


const router = express.Router();


//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});





/**
 * for now this would not really do any work on the backend other than store participant id with the rest of particiapnt info on the registration page
 * in the future we plan for it to send this participnat id to the admin who then verifies and send a unique link to the participant for registration
 */
router.post('/AdminPagePending', async (req: Request, res: Response) => {

async function getPendings () {
    const result = await getUsersAndPendingStatus();
    res.send(result);
}
getPendings()
logger.info("\nPending users sent to admin");

});

router.post('/AdminPageApproved', async (req: Request, res: Response) => {

async function getApproved () {
    const result = await getAllAprovedUsers();
    res.send(result);
}
getApproved()
logger.info("\nAccepted users sent to admin");

});

router.post('/approve', async (req: Request, res: Response) => {

async function approvePending () {  
    deletePendingUser(req.body.id);
    insertApprovedUser(req.body.id, new Date())
    logger.info("User approved: " + req.body.id);
}

approvePending();


});

router.post('/rejected', async (req: Request, res: Response) => {

async function deletePending() {  
    deletePendingUser(80000);
    logger.info("User deleted: " + req.body.userId);
}
deletePending();
});


router.post('/deleteAproved', async (req: Request, res: Response) => {
    async function deleteApproved () {
        deleteApprovedUser(req.body.userId);
    }
    deleteApproved()
    logger.info("\n Approved user: " + req.body.userId +' deleted');
    
    });
    
  module.exports = router;