const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json())

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err){
    console.log(err);
  }
  const db = client.db('edinburgh')
  const parks = db.collection('parks');
  const parksRouter = createRouter(parks);
  app.use('/api/parks', parksRouter);

  const reviews = db.collection('review')
  const reviewRouter = createRouter(reviews);
  app.use('/api/reviews', reviewRouter)
});

app.listen(3000, function(){
  console.log('listening on port 3000');//default port
})
