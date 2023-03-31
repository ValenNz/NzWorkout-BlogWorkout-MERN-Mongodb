
/* Import Model */
const { default: mongoose } = require('mongoose');
const Workout = require('../models/workoutsModels');

/* Create */
exports.createWorkout = (req,res, next) =>{
    console.log(req.file, req.body,16)
    const title = req.body.title
    const load = req.body.load
    const reps = req.body.reps
    const cattegory = req.body.cattegory
    const image = req.file.path

    /* Create */
    const Posting = new Workout({
        title: title,
        load: load,
        reps:reps,
        cattegory:cattegory,
        image:image,
    })
    /* Check create */
    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Workout Success',
            data: result
        })
    })
    .catch(err => {
        console.log('err: ', err)
    })
}

/* Read All */
exports.getAllWorkout = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.json(workouts)

}

/* Read Detail */
exports.getSingleWorkout = async (req,res) => {
   
}

/* Update */
exports.updateWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(404).json({err : 'No Such workout'})
    }

    res.status(200).json(workout)
}

/* Delete */
exports.deleteWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
     return res.status(404).json({err : 'No Such workout'})
    }

    res.status(200).json(workout)
}