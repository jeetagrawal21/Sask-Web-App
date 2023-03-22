import express from 'express';
import { checkpass, checkifadmin } from '@src/services/User-Services';

const router = express.Router();



/**
 * Gets login data from the user
 * req: login data as a string array containing email and password
 * res: success or error message
 */
router.get('/login', (req, res) => {
  const data = JSON.stringify(req.body);
  async function checking () {  
    var result:boolean = await checkpass(req.body.email, req.body.password);    //async function is required to make it wait for reply (await used below to specific what we wait for)
    if (result){     //calls check password to see if pass and email match a database entry
      console.log("login success!");
      const isadminresult = await checkifadmin(req.body.email)
      const userdata = {
        exist: result,
        isadmin: isadminresult
      }
      res.send(userdata);
    } else {
      const userdata = {
        exist: false,
        isadmin: false,
      };
      console.log('login failed');
      res.send(userdata);
    }
  }
  checking(); //Calling above function with data from page

  // send data as JSON object to the function that aunthenticates login
  // send response if login was successful or not( we might not actually need the get request below)
});

export default router;
