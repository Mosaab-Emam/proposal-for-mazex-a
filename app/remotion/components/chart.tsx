import { Covid } from 'app/lib/types';
import type { ChartConfigurationInstance } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import React from 'react';

Chart.defaults.color = "#fff";

export const ChartComponent: React.FC<{ config: ChartConfigurationInstance, id: string }> = ({ config, id }) => {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  try {
    new Chart(
      document.getElementById(id)! as HTMLCanvasElement,
      config
      // {
      //   type: 'bar',
      //   data: {
      //     labels: data.map(row => row.year),
      //     datasets: [
      //       {
      //         label: 'Acquisitions by year',
      //         data: data.map(row => row.count)
      //       },
      //       {
      //         label: 'Acquisitions by year',
      //         data: data.map(row => row.count)
      //       },
      //       {
      //         label: 'Acquisitions by year',
      //         data: data.map(row => row.count)
      //       },
      //     ]
      //   }
      // }
    );
  } catch { }

  return <canvas id={id} width="100%"></canvas>;
}