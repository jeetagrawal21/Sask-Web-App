import { Line } from '@nivo/line';
import React from 'react';

const commonProperties = {
    width: 800,
    height: 400,
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    enableGridX: false,
    enableGridY: false,
};

const MyLineChart = () => (
    <Line
        {...commonProperties}
        curve="monotoneX"
        data={[
            {
                id: 'fake corp. A',
                data: [
                    { x: 0, y: 7 },
                    { x: 1, y: 5 },
                    { x: 2, y: 11 },
                    { x: 3, y: 9 },
                    { x: 4, y: 13 },
                    { x: 7, y: 16 },
                    { x: 9, y: 12 },
                ],
            },
        ]}
        xScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
        }}
        axisLeft={{
            legend: 'linear scale',
            legendOffset: 12,
        }}
        axisBottom={{
            legend: 'linear scale',
            legendOffset: -12,
        }}
    />
);

export default MyLineChart;
