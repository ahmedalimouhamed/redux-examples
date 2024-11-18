import express from 'express';
import bodyParser from 'body-parser';
import {DataModel} from './db.js'

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/data', async(req, res) => {
  try{
    const data = await DataModel.find();
    res.json(data);
  }catch(error){
    res.status(500).json({
      error: 'Failed to fetch data'
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
})