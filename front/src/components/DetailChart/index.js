import React from 'react';
import Chart from 'react-apexcharts';

function DetailChart() {
  const data = {
    options: {
      chart: {
        foreColor: '#fff',
      },
      grid: {
        borderColor: 'green',
      },
      colors: ['gray'],
      markers: { size: 4 },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: 'Price',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return <Chart options={data.options} series={data.series} type="line" width="500" />;
}

export default DetailChart;
