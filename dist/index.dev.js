"use strict";

var AWS = require('aws-sdk');

var bucket = 'textimage-dev-serverlessdeploymentbucket-ctdtggba9qmz';
var photo = 'frase.jpg';
var config = new AWS.Config({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});
AWS.config.update({
  region: 'us-east-1'
});
var client = new AWS.Rekognition();
var params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo
    }
  }
};
client.detectText(params, function (err, response) {
  if (err) {
    console.log(err, err.stack);
  } else {
    var fraseCompleta = [];
    console.log("Detected Text for ".concat(photo));
    response.TextDetections.forEach(function (label) {
      if (label.Type == 'LINE') {
        fraseCompleta.push(label.DetectedText);
      }
      /*console.log(`Detected Text: ${label.DetectedText}`);
      console.log(`Type: ${label.Type}`);
      console.log(`ID: ${label.Id}`);
      console.log(`Parent ID: ${label.ParentId}`);
      console.log(`Confidence: ${label.Confidence}`);
      console.log(`Plygon: `);
      console.log(label.Geometry.Polygon);*/

    });
    console.log(fraseCompleta);
  }
});

module.exports.handler = function _callee(event) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify({
              message: "Go Serverless v3.0! Your function executed successfully!",
              input: event
            }, null, 2)
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
//# sourceMappingURL=index.dev.js.map
