import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
//   responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      // align: 'start',

      labels: {
        font: {
          family: "Lato"
        },
        color: '#252525',
      },

      
    },
    labels: {
        font: {
          family: "Lato"
        }
      },
    title: {
      display: true,
      // align: 'start',
      text: 'Productivity',
      color: '#252525',
      font: {
        family: "Lato",
        size: 23,
        weight: 'bold'
      
      }
    },
    
  },
  scales: {
    y:{
        ticks:{
            color: '#303030',
            fontSize: 12,
            font: {
              family: "Lato"
            }
        }
    },
    x: {
        ticks:{
            color: '#303030',
            fontSize: 12,
            font: {
              family: "Lato"
            }
        }
    },
}



};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 
              'Friday', 'Saturday', 'Sunday'];

var today = new Date();
var labels = [];
// var dates = []
var randomInts = []
// {
//   date:
//   day:
// }
for (var i = 0; i < 7; i++) {
    labels.push(
      {
        date: new Date(Date.now() - (7 - i - 1) * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
        day: days[(today.getDay() + i) % 7] + getDay(i)
      }
      );

      randomInts.push( getRandomInt(40, 100) )
}
function getDay(index) {
 return index === 6 ? ' (today)' : ''
}


export default function IssueUpdateData( { IssueVersions, isMobile } ) {

  const data = {
    labels: labels.map(item => item.day),
    datasets: [
      {
        label: 'Issue updates',
        data: labels.map(
                (item, key) => IssueVersions?.filter(
                iv => iv.dateOfUpdate.substring(0, 10) === item.date.substring(0, 10) && iv.wasModified === true
                ).length + randomInts[key]  
                // make the graph livelier with randomInts
                // delete if app is used for serious reasons
              ),
        
        borderColor: '#80B9B0',
        backgroundColor: '#80B9B0',
      },
    ],
  };


  return <div className='h-[203px] w-[45vw] '
  style={{
    width: isMobile ? '65vw' : '45vw',
    marginRight: isMobile ? '25vw' : '',
    justifyContent: 'center',
    display: 'flex',
  }}
  > 
  <Line 
        options={options} 
        data={data} 
        height={'100%'}
        width={'100%'}

        />
    </div>
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
