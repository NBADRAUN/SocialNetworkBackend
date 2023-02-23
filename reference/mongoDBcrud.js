

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

