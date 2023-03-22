import express from 'express';
import { accountcreationuser } from '@src/services/User-Services';
//import {partIDnum} from '@src/routes/requestAccount'
const router = express.Router();
const app = express();
const session = require('express-session');







router.get('/postregistrationinfo', (req, res) => {
    const data = req.body;
    const partIDnum =  req.session.partIDnum;
    //console.log(partIDnum, data['surname'] + data['givenName1'], data['password'], data['email'], data['question1'], data['answer1'], data['question2'], data['answer2'], data['question3'], data['answer3'])
    accountcreationuser(
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
    console.log(data);
  
    // call function to post data to the database
  
    res.send(true); // needs failure handling
  });

  export default router;
