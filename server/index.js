const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.route(/* ... */);
  //.get()
  //.post()
  //...

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})
