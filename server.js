const express = require('express'); // creates the server using express // 

const routes = require('./routes');


const app = express(); // middleware for API functions 
app.use(express.json()); // adds the express function to produce data as JSON // 
app.use(express.urlencoded({ extended: true }));  // middleware to parse incoming requests 

app.use(routes);
// app.use('/users',user); 

// const data = require('./models'); 

///create a server using express on port 3001///
const PORT = process.env.PORT || 3001;





/// server opens port to use /// 
app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});








