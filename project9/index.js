import { generateMultiCharts } from "./chart.js";
import { fetchOrders, fetchProfitsByRegion, fetchSatisfactionByRegion, store } from "./store.js";
import fs from 'fs';

const main = async() => {
  await store.dispatch(fetchOrders({startDate: '2024-01-01', endDate: '2024-01-05'}));
  await store.dispatch(fetchProfitsByRegion());
  await store.dispatch(fetchSatisfactionByRegion());
  
  const state = store.getState();

  console.log("fetched orders : ",state.orders);
  console.log("fetched profits : ",state.profits);
  console.log("fetched satisfactions : ",state.satisfaction);
  
  const charts = generateMultiCharts(state.orders, state.profits, state.satisfaction);

  fs.writeFileSync('sales_chart.png', charts[0].toBuffer('image/png'));
  fs.writeFileSync('profit_chart.png', charts[1].toBuffer('image/png'));
  fs.writeFileSync('satisfaction_chart.png', charts[2].toBuffer('image/png'));

  console.log('Charts generated!');
}

main();