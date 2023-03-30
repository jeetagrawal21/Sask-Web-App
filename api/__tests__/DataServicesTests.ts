import {getData, checkifadmin, credentials} from "../src/services/Data-Services"
import { Client, Pool } from 'pg';




describe("getData function", () => {
  it("returns formatted data for valid id", async () => {
    const id = 42176;
    const result = await getData(id);
    // Define expected data
    const expectedData = [      { name: 'Feb', 'Cough severity': 4, uv: 4 },      { name: 'Mar', 'Cough severity': 2, uv: 2 },      { name: 'Apr', 'Cough severity': 1, uv: 1 },      { name: 'May', 'Cough severity': 0, uv: 0 }    ];
    expect(result).toEqual(expect.arrayContaining(expectedData));
  });
  
  it("returns empty array for invalid id", async () => {
    const id = 9999; // An invalid id
    const result = await getData(id);
    expect(result).toEqual([]);
  });
});
