/* Initialitaion Express */
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

// Add body-parser middleware
app.use(bodyParser.json());


const workoutControllers = require('../controllers/workoutsControllers')
app.get('/datas',workoutControllers.getAllWorkout)
app.get('/data/:id',workoutControllers.getSingleWorkout)
app.post('/data', workoutControllers.createWorkout)
app.patch('/data/:id',workoutControllers.updateWorkout)
app.delete('/data/:id',workoutControllers.deleteWorkout)


module.exports = app