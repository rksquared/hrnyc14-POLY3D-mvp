const express = require(`express`);
const bodyParser = require(`body-parser`);


//require DB methods
const {retrieveObjects} = require(`../database/index`);


//require API request helper
const {polyRequest} = require(`../helpers/poly`);


//env variables
const port = process.env.PORT || 5005;


//instantiate express application
const app = express();


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
});


//ROUTING
//get @ `/objects`
app.get(`/objects`, (req, res) => {
  console.log(`GET request @ "/objects" route recieved`);

  retrieveObjects()
    .then((data) => res.status(200).send(JSON.stringify(data)))
    .catch((err) => console.error(`experiencing difficulties retrieving objects from DB ${err}`));

});

//post @ `/objects`
app.post(`/objects`, (req, res) => {
  console.log(`POST request @ "/objects" route recieved with payload: ${req.body.topic}`);

  polyRequest(req.body.topic);

  res.status(201).send(`ROMA VICTA`);

});


//INIT SERVER
app.listen(port, () => {
  console.log(`server listening on post ${port}`);
});




//TEST DATA
// let testData = {
//   "name": "assets/5GZ7GxecSJa",
//   "displayName": "Intersection",
//   "authorName": "Bruno Oliveira",
//   "description": "A traffic intersection. No traffic lights, so proceed with caution.",
//   "createTime": "2018-04-02T20:48:49.743694Z",
//   "updateTime": "2018-04-06T10:31:25.734025Z",
//   "formats": [
//       {
//           "root": {
//               "relativePath": "intersection.obj",
//               "url": "https://poly.googleapis.com/downloads/5GZ7GxecSJa/ccqEh7aZWPP/intersection.obj",
//               "contentType": "text/plain"
//           },
//           "resources": [
//               {
//                   "relativePath": "intersection.mtl",
//                   "url": "https://poly.googleapis.com/downloads/5GZ7GxecSJa/ccqEh7aZWPP/intersection.mtl",
//                   "contentType": "text/plain"
//               }
//           ],
//           "formatComplexity": {
//               "triangleCount": "1518"
//           },
//           "formatType": "OBJ"
//       },
//       {
//           "root": {
//               "relativePath": "intersection.gltf",
//               "url": "https://poly.googleapis.com/downloads/5GZ7GxecSJa/9YW18Sc51vR/intersection.gltf",
//               "contentType": "model/gltf+json"
//           },
//           "resources": [
//               {
//                   "relativePath": "intersection.bin",
//                   "url": "https://poly.googleapis.com/downloads/5GZ7GxecSJa/9YW18Sc51vR/intersection.bin",
//                   "contentType": "application/octet-stream"
//               }
//           ],
//           "formatComplexity": {
//               "triangleCount": "1518"
//           },
//           "formatType": "GLTF2"
//       }
//   ],
//   "thumbnail": {
//       "relativePath": "5GZ7GxecSJa.png",
//       "url": "https://lh3.googleusercontent.com/UjyZ_kLmdSRGcXUa5PHPbj1ZqRbw7iFxjfdT56z1S3TfAn7ls1bXgDhS7MX7NE8",
//       "contentType": "image/png"
//   },
//   "license": "CREATIVE_COMMONS_BY",
//   "visibility": "PUBLIC",
//   "isCurated": true,
//   "presentationParams": {
//       "orientingRotation": {
//           "w": 1
//       },
//       "colorSpace": "LINEAR"
//   }
// }
