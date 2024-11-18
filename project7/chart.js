import Chart from 'chart.js/auto';
import {createCanvas} from 'canvas';

export const generateChart = data => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: 'Sales',
          data: data.map((item) => item.value)
        }
      ]
    }
  });

  return canvas.toBuffer('image/png');
};

