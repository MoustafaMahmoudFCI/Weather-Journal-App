// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server

// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log(`App Running on localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req, res) {
    res.send(projectData);
}
// Post Route
app.post('/addWeather', addData);

function addData(req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.end();
    console.log(projectData);
}