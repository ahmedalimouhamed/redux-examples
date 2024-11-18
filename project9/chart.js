import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';

export const generateMultiCharts = (orders, profits, satisfaction) => {
  const salesCanvas = createCanvas(800, 600);
  const salesCtx = salesCanvas.getContext('2d');
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: orders.map(o => o.date.toString().split('T')[0]),
      datasets: [{label: 'Sales', data: orders.map(o => o.sales)}]
    }
  });

  const profitCanvas = createCanvas(800, 600);
  const profitCtx = profitCanvas.getContext('2d');
  new Chart(profitCtx, {
    type: 'pie',
    data: {
      labels: profits.map((p) => p._id),
      datasets: [{label: 'Profit', data: profits.map((p) => p.totalProfit)}],
    },
  });

  const satisfactionCanvas = createCanvas(800, 600);
  const satisfactionCtx = satisfactionCanvas.getContext('2d');
  new Chart(satisfactionCtx, {
    type: 'radar',
    data: {
      labels: satisfaction.map((s) => s._id),
      datasets: [
        {label: 'Avg Satiscation', data: satisfaction.map((s) => s.avgSatisfaction)},
      ]
    }
  });

  return [salesCanvas, profitCanvas, satisfactionCanvas];
}