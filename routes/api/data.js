const express = require('express');
const mongodb = require('mongodb');
const secrets = require('./secrets.js');
const router = express.Router();

//Get Data
router.get('/', async (req, res) => {
  const data = await loadDataCollection();
  res.send(await data.find({}).toArray());
});

//Add Data
router.post('/', async (req, res) => {
  const data = await loadDataCollection();
  await data.insertOne({
    year: req.body.year,
    month: req.body.month,
    kwh: req.body.kwh,
    bill: req.body.bill,
    savings: req.body.savings
  });
  res.status(201).send();
});

//Delete Data
router.delete('/:id', async (req, res) => {
  const data = await loadDataCollection();
  await data.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadDataCollection() {
  const client = await mongodb.MongoClient.connect(secrets.mongourl, {
    useNewUrlParser: true
  });

  return client.db('solstice').collection('data');
}

module.exports = router;
