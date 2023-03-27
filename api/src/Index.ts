import './Pre-Start'; // Must be the first import
import { Logger } from "tslog";
import { appendFileSync } from "fs";


import EnvVars from '@src/declarations/major/EnvVars';
import server from './Server';

// **** Start server **** //


export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});




const msg = ('Express server started on port: ' + EnvVars.port.toString());
server.listen(EnvVars.port, () => logger.info('\n' + msg));

//export default { logger } 
  

