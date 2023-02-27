const express = require('express'); // creates the server using express /// 

const routes = require('./routes');  // creates the route to the routes /// 

/// these are middleware ///// 
const app = express(); // middleware for API  //// 
app.use(express.json()); // express JSON to handle JSON  ////
app.use(express.urlencoded({ extended: true }));  // middleware for object requests ///  

app.use(routes);

///create a server on port 3001 or whatever the hosting service provides ///
const PORT = process.env.PORT || 3001;


/// server with either port 3001 or whatever the hosting service provides.  /// 
app.listen(PORT, () => {
console.log(`Server listening at http://localhost:${PORT}`);
});








