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

app.get('/', (req, res) => {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    });
});

const getLatitudeAndLongitude = (address) => {
    return new Promise((resolve, reject) => {

        var addressParameter = address.replace(/ /g, "+")

        var options = {
            'method': 'GET',
            'url': 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressParameter + '&key=' + process.env.GOOGLE_API_KEY
        };

        request(options, function (error, response) {
            if (error) throw new Error(error);
            resolve(JSON.parse(response.body).results[0].geometry.location)
        });
    });
}

app.get('/nearbydoctors', (req, res) => {

    getLatitudeAndLongitude(req.query.address).then((addressObject) => {

        console.log("addressObject: ", JSON.stringify(addressObject, null, 2));

        var options = {
            'method': 'GET',
            'url': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + addressObject.lat + ',' + addressObject.lng + '&radius=1500&type=doctor&keyword=doctor&key=' + process.env.GOOGLE_API_KEY
        };

        request(options, function (error, response) {
            if (error) throw new Error(error);
            res.send(JSON.parse(response.body))
        });
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

require("cf-deployment-tracker-client").track();