import React from 'react';
import Chart from 'react-apexcharts';

function DetailChart({ productData }) {
  const data = {
    options: {
      chart: {
        foreColor: '#fff',
      },
      grid: {
        borderColor: 'green',
      },
      tooltip: { theme: 'dark' },
      colors: ['gray'],
      markers: { size: 4 },
      xaxis: {
        categories: [...productData.map((product) => new Date(product.createdAt).toLocaleString())],
      },
    },
    series: [
      {
        name: 'Price',
        data: [...productData.map((product) => product.price)],
      },
    ],
  };

  return <Chart options={data.options} series={data.series} type="line" width="100%" />;
}

export default DetailChart;
