const fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser');
const express = require('express');
const market = require('steam-market-pricing');
const { get } = require('http');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();

const port = 5000;


app.use(cors())
app.use(express.json())

app.get('/get-data', (req, res) => {
  const results = [];

  fs.createReadStream('../csgo.csv')
    .pipe(csv())
    .on('data', (data) => {
     results.push(data);

    })
    .on('end', () => {
      res.json(results);
    });
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