import React from 'react';

function SymptomTable({ data }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Response Time</th>
          <th> Brain Fog in last 18 months?</th>
          <th>How severe is your brain fog (1-10)?</th>
          <th>Have you experienced shortness of breath in last 18 months?</th>
          <th>How breathless are you (1-10)?</th>
          <th> Have you experienced sleep issues in last 18 months?</th>
          <th> How severly has your sleep been impacted (1-10)?</th>
          <th> How you experienced fatigue in last 18 months?</th>
          <th> Right now how severely is your mobility activities (1-10)?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.Name}</td>
            <td>{item['Response Time']}</td>
            <td>
              {
                item[
                  '[124_SAQ] Brain fog refers to the feeling of being mentally '
                ]
              }
            </td>
            <td>
              {
                item[
                  '[126_VAS] Right now how severe is your brain fog on a scale '
                ]
              }
            </td>
            <td>
              {
                item[
                  '[7_SAQ] Have you experienced shortness of breath in the pa'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[162_VAS] Right now how breathless are you on a scale of 0-1'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[110_SAQ] Have you experienced issues with your sleep or abi'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[112_VAS] Right now how severely has your sleep been impacte'
                ]
              }
            </td>
            <td>
              {
                item[
                  '[180_SAQ] Have you experienced fatigue in the past eighteen '
                ]
              }
            </td>
            <td>
              {
                item[
                  '[183_VAS] Right now how severely is your mobility activities'
                ]
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SymptomTable;
