import {store, fetchData} from "./store.js";
import {generateChart}  from './chart.js';
import fs  from 'fs';

store.dispatch(fetchData()).then(() => {
  const state = store.getState();
  const chartBuffer = generateChart(state.data.data);

  fs.writeFileSync('chart.png', chartBuffer);
  console.log('Chart saved as chart.png');
})