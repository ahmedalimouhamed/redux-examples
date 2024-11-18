import { generateCharts } from "./chart.js";
import { fetchData, store } from "./store.js";
import fs from "fs";

store.dispatch(fetchData()).then(() => {
  const state = store.getState();
  console.log(state.data.data);

  // Generate chart buffer
  const chartBuffer = generateCharts(state.data.data);

  if (!chartBuffer) {
    console.error("Failed to generate chart.");
    return;
  }

  // Save the chart buffer to a PNG file
  fs.writeFileSync("chart.png", chartBuffer);
  console.log("Chart saved as chart.png");
});
