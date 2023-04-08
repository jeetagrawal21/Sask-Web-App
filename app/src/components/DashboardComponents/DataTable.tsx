import React from 'react';

function DataTable({ data }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Device ID</th>
          <th>Scheduled Time</th>
          <th>Issued Time</th>
          <th>Response Time</th>
          <th>Duration (seconds) from scheduled to completion time</th>
          <th>Duration (seconds) from first response to completion time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.Name}</td>
            <td>{item['Device ID']}</td>
            <td>{item['Scheduled Time']}</td>
            <td>{item['Issued Time']}</td>
            <td>{item['Response Time']}</td>
            <td>
              {item['Duration (seconds) from scheduled to completion time']}
            </td>
            <td>
              {
                item[
                  'Duration (seconds) from first response to completion time'
                ]
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
