const express = require('express');
const app = express();

app.use(express.static(__dirname + '/view'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up at port ${port}`);
});