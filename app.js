const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();

app.use(express.static(__dirname + '/view'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});


const port = process.env.PORT || 8080;
https
  .createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, () => {
    console.log(`server is up at port ${port}`);
  });