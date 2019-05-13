const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection){

  const router = express.Router();

//index
  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
  })

    // SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .find({ _id: ObjectID(id) })
    .toArray()
    .then((docs) => res.json(docs))
  });


 //delete record
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .deleteOne({ _id: ObjectID(id) })
    .then(() => {
      collection
      .find()
      .toArray()
      .then((docs) => res.json(docs));
    })
  });

//UPDATE
  router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
    .updateOne(
      { _id: ObjectID(id) },
      { $set: updatedData }
    )
    .then(() => {
      collection
      .find()
      .toArray()
      .then((docs) => res.json(docs));
    })
  });
  //CREATE RECORD
    router.post('/', (req, res) => {
      const newData = req.body;
      collection
      .findOne(newData, function(err, success){
        if(err){
          console.log(err);
        }
        else {
          if(success == null){
            collection
            .insertOne(newData)
            .then(() => {
              collection
              .find()
              .toArray()
              .then((docs) => res.json(docs));
            });
          }
        }
      })
    });
    
  return router;

}


module.exports = createRouter;
