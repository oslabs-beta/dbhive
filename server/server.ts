// declare function require(moduleName: string): any;
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = 3000;

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/*', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
  });
}

console.log('Hello from server')

// start the express server
app.listen(port, () => {
  console.log('server started at http://localhost:3000');
});

module.exports = app;
