import {getdata, checkifadmin, credentials} from "../src/server"
import { Client, Pool } from 'pg';


//import checkifadmin from "../src/server"
// import getuser from "../src/server"
// import checkpass from "../src/server"
// import accountcreationadmin from "../src/server"
// import accountcreationuser from "../src/server"


describe("getdata function", () => {
  test("returns formatted data for valid id", async () => {
    const id = 42176;
    const result = await getdata(id);
    // Define expected data
    const expectedData = [      { name: 'Feb', 'Cough severity': 4, uv: 4 },      { name: 'Mar', 'Cough severity': 2, uv: 2 },      { name: 'Apr', 'Cough severity': 1, uv: 1 },      { name: 'May', 'Cough severity': 0, uv: 0 }    ];
    expect(result).toEqual(expect.arrayContaining(expectedData));
    console.log("getdata function: valid id - PASSED");
  });
  
  test("returns empty array for invalid id", async () => {
    const id = 9999; // An invalid id
    const result = await getdata(id);
    expect(result).toEqual([]);
    console.log("getdata function: invalid id - PASSED");
  });
});
