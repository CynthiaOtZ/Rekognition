var AWS = require('aws-sdk');

const bucket = 'textimage-dev-serverlessdeploymentbucket-ctdtggba9qmz'
const photo = 'frase.jpg'

const config = new AWS.Config({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
})

AWS.config.update({region: 'us-east-1'});
const client = new AWS.Rekognition();

const params = {
  Image: {
    S3Object:{
      Bucket: bucket,
      Name: photo
    },
  },
}

client.detectText(params, function(err, response){
  if(err){
    console.log(err, err.stack);
  }
  else {
     
    var fraseCompleta = []; 
    console.log(`Detected Text for ${photo}`);
    response.TextDetections.forEach(label => {

      if(label.Type == 'LINE')
      {
        fraseCompleta.push(label.DetectedText);
      }
      /*console.log(`Detected Text: ${label.DetectedText}`);
      console.log(`Type: ${label.Type}`);
      console.log(`ID: ${label.Id}`);
      console.log(`Parent ID: ${label.ParentId}`);
      console.log(`Confidence: ${label.Confidence}`);
      console.log(`Plygon: `);
      console.log(label.Geometry.Polygon);*/

      
    })

    console.log(fraseCompleta);
  }
});

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
