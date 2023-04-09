import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SymptomTable from './SymptomTable';

describe('SymptomTable component', () => {
  it('renders the table with empty data', () => {
    render(<SymptomTable data={[]} />);
  });
  it('renders the table with data', () => {
    const testData = [
      {
        Name: 'John Doe',
        'Response Time': '1 day',
        '[124_SAQ] Brain fog refers to the feeling of being mentally ': 'Yes',
        '[126_VAS] Right now how severe is your brain fog on a scale ': '3',
        '[7_SAQ] Have you experienced shortness of breath in the pa': 'No',
        '[162_VAS] Right now how breathless are you on a scale of 0-1': '0',
        '[110_SAQ] Have you experienced issues with your sleep or abi': 'Yes',
        '[112_VAS] Right now how severely has your sleep been impacte': '7',
        '[180_SAQ] Have you experienced fatigue in the past eighteen ': 'Yes',
        '[183_VAS] Right now how severely is your mobility activities': '5',
      },
    ];
    const { getByRole } = render(<SymptomTable data={testData} />);
    const table = getByRole('table');

    expect(table).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
