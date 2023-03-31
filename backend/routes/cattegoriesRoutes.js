/* Initialitaion Express */
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

// Add body-parser middleware
app.use(bodyParser.json());


const cattegoryControllers = require('../controllers/cattegoriesControllers')
app.get('/datas',cattegoryControllers.getAllCattegory)
app.get('/data/:id',cattegoryControllers.getSingleCattegory)
app.post('/data', cattegoryControllers.createCattegory)
app.delete('/data/:id',cattegoryControllers.deleteWorkout)

module.exports = app
