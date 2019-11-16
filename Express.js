const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res) => res.send('GET /'));
app.listen(port, () => console.log('Week 5 practice server is working...'));
