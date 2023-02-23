

//// Get route //// 
router.get('/', (req, res) => {
    // Use db connection to find all documents in collection
    db.collection('users')
      .find()
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });


/// post route //// 
router.post('/', (req, res) => {
  // Use db connection to add a document
  db.collection('users').insertOne(
    { 
      username: req.body.username,
      email: req.body.email, 
      thoughts: [], 
    },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

//// update route ///// 






/// delete route ///// 
router.delete('/:id', (req, res) => {
  db.collection('users')
    .deleteOne({_id:ObjectId(req.params.id)},
    (err, results) => {
      if (err) throw err;
      res.json(results); 
    }
  );
});

