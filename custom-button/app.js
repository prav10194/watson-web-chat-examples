require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
var fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser')
const multer = require('multer');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))
var request = require('request');

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
    version: '2019-02-11',
    iam_apikey: process.env.VISUAL_RECOGNITION_API_KEY
});

var upload = multer({ dest: 'uploads/' })

app.post('/uploadInjuryPicture', upload.any('injuryPicture'), (req, res) => {

    // console.log(JSON.stringify(req.files, null, 2));
    var images_file = fs.createReadStream(req.files[0].path);
    var classifier_ids = [process.env.VISUAL_RECOGNITION_CLASSIFIER_ID];
    var threshold = 0.6;

    var params = {
        images_file: images_file,
        classifier_ids: classifier_ids,
        threshold: threshold
    };

    visualRecognition.classify(params, function (err, response) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(response, null, 2))
        }
    });
})

app.get('/', (req, res) => {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

require("cf-deployment-tracker-client").track();