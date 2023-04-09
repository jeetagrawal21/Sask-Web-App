import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CovidTable from './CovidTable';

describe('CovidTable component', () => {
  it('renders the table with empty data', () => {
    render(<CovidTable data={[]} />);
  });
  it('renders the table with data', () => {
    const testData = [
      {
        Name: 'John Doe',
        'Response Time': '1 day',
        '[146_SAQ] Have you received a COVID-19 vaccine?': 'Yes',
        '[251_CAL] What day did you receive your FIRST COVID vaccinat':
          '2022-03-01',
        '[156_SAQ] Have you had COVID-19? This can be medically confi': 'No',
        '[2_SAQ] How long ago were you confirmed to have or suspect': 'N/A',
        '[4_SAQ] How severe in your opinion was the disease within ': '5',
      },
    ];
    const { getByRole } = render(<CovidTable data={testData} />);
    const table = getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Have you had COVID-19?')).toBeInTheDocument();
    expect(
      screen.getByText('How sever was the acute covid?')
    ).toBeInTheDocument();
  });
});
