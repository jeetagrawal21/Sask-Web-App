import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable component', () => {
  it('renders the table with empty data', () => {
    render(<DataTable data={[]} />);
  });

  it('renders the table with data', () => {
    const testData = [
      {
        Name: 'John Doe',
        'Device ID': '123',
        'Scheduled Time': '2022-04-01T09:00:00Z',
        'Issued Time': '2022-04-01T09:10:00Z',
        'Response Time': '2022-04-01T09:12:00Z',
        'Duration (seconds) from scheduled to completion time': '720',
        'Duration (seconds) from first response to completion time': '120',
      },
    ];
    const { getByRole } = render(<DataTable data={testData} />);
    const table = getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Scheduled Time')).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();
    expect(
      screen.getByText('Duration (seconds) from scheduled to completion time')
    ).toBeInTheDocument();
  });
});
