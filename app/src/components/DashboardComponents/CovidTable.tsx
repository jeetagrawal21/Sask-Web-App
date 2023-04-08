import React from 'react';

function CovidTable({ data }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Response Time</th>
          <th> Have you received a COVID-19 vaccine?</th>
          <th>What day did you receive your FIRST COVID vaccination</th>
          <th>Have you had COVID-19?</th>
          <th>How long ago were you confirmed to have or suspect</th>
          <th> How sever was the acute covid?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.Name}</td>
            <td>{item['Response Time']}</td>
            <td>{item['[146_SAQ] Have you received a COVID-19 vaccine?']}</td>
            <td>
              {
                item[
                  '[251_CAL] What day did you receive your FIRST COVID vaccinat'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[156_SAQ] Have you had COVID-19? This can be medically confi'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[2_SAQ] How long ago were you confirmed to have or suspect'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[4_SAQ] How severe in your opinion was the disease within '
                ]
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CovidTable;
