import { createCanvas } from "canvas"
import Chart from "chart.js/auto";

export const generateCharts = (data) => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [...new Set(data.map((item) => item.region))],
      datasets: [
        {
          label: 'Sales',
          data: data.reduce((acc, curr) => {
            acc[curr.region] = (acc[curr.region] || 0) + curr.sales;
            return acc;
          }, {})
        }
      ]
    }
  })

  return canvas.toBuffer('image/png');

}