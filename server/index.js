const express = require(`express`);
const bodyParser = require(`body-parser`);

//env variables
const port = process.env.PORT || 5005;

//MIDDLEWARE SETUP
//set up express static file server
app.use(express.static(`${__dirname}/../client/dist`));

//set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use standard CORS headers
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With`, `Content-Type`, `Accept`);
  next();
})

//ROUTING
//get @ 
app.get(`/objects`, (req, res) => {
  console.log(`request @ "/objects" route recieved`);

  res.status(200).send(`ROMA VICTA`);
})


//INIT SERVER
app.listen(post, () => {
  console.log(`server listening on post ${port}`);
})