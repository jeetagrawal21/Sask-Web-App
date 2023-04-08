
import { Client, Pool } from 'pg';
import { credentials } from '../declarations/Database_Credentials';
import { Logger } from "tslog";
import { appendFileSync } from "fs";


//setting up logging 
export const logger = new Logger();

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});





/**
  Function Name: getData
  Description: Retrieves user data from the "userdata" table in the database and formats it for use in a line chart.
  @param {number} id - The unique ID of the user to retrieve data for.
  @returns {Promise<Array>} - Returns an array of formatted data objects for use in a line chart.
  */
export async function getData(id: number) {
  const pool = new Pool(credentials);
  const result = await pool.query(               //query looks for all users with email
    'SELECT "Response Time", "[18_SAQ] In the past 30 days how often have you experienced" FROM "userdata" WHERE "[18_SAQ] In the past 30 days how often have you experienced" IS NOT NULL AND "id" = $1', [id]);
  await pool.end();
  return formatDataForLineChart(result.rows);  // returns formatted data 
}



type DataItem = {
  'Response Time': Date,
  '[18_SAQ] In the past 30 days how often have you experienced': number
}

/**
 * Formats the given data array into the format expected by a line chart.
 * @param {DataItem[]} data - The array of data items to format.
 * @returns {Object[]} The formatted data array.
 */
export function formatDataForLineChart(data: DataItem[]) {
  // Use the map function to transform each item in the array
  return data.map((item: DataItem) => {
    return {
      name: item['Response Time'].toLocaleString('default', { month: 'short' }),       // Extract the month name from the response time using toLocaleString
      "Cough severity": item['[18_SAQ] In the past 30 days how often have you experienced'],
      uv: item['[18_SAQ] In the past 30 days how often have you experienced'],
    };
  });
}

export default {
  getData,
  formatDataForLineChart
} 
