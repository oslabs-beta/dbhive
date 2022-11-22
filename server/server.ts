const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

// intialize express
const app = express();

// parsing request
app.use(express.json());
app.use(express.urlencdoded({extended:true}))

//Base App handler
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../view/index.html'));
  });

app.get('/hi', (req, res) => {
    return res.status(200).send('server is responding! :)');
});
  
// catch all route handler
app.use('*', (req, res) => {
    res.sendStatus(404);
  });
  
// start server
app.listen(3000, () => {
    console.log('Server listening and Working!!!!')
})

module.exports = app;