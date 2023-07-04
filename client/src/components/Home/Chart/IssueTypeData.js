import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Bug', 'Task', 'Feature'],
  datasets: [
    {
      label: '# of Issues',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        '#C5E1D1',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        '#98C6AD',

      ],
      borderWidth: 1,
    },
  ],
};

export function IssueTypeData() { 
  return <div className='h-[200px] w-[50vw]'> 
          <Doughnut
          data={data} 
          options={{ maintainAspectRatio: false }}
          height={'250vh'}
          width={'250vw'}
          />
          </div>
}