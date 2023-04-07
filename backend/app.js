const fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser');
const express = require('express');
const market  = require('steam-market-pricing');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

async function getData() {
  return new Promise((res, rej) => {
    const results = [];
    fs.createReadStream('../csgo.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        for (let i = 0; i < results.length; i++) {
          const item = results[i].itemName;
          const price = await market.getItemPrice(730, item);
          results[i]['steamPrice'] = price.lowest_price;
        }
        res(results);
      })
      .on('error', (error) => {
        rej(error);
      });
  });
}

app.get('/get-data', async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});


app.post('/data', (req, res) => {
  const { itemName, quantity, cost } = req.body;

  const csvWriter = createCsvWriter({
    path: '../csgo.csv',
    header: [
      { id: 'itemName', title: 'itemName' },
      { id: 'quantity', title: 'quantity' },
      { id: 'cost', title: 'cost'},
      { id: 'totalPrice', title: 'totalPrice'},
    ],
    append: true,
    newLine: '\r\n'
  });

  const data = [
    { itemName: itemName, quantity: quantity, cost: cost, totalPrice: quantity*cost}
  ];

  csvWriter.writeRecords(data)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

  console.log(itemName, quantity, cost);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))