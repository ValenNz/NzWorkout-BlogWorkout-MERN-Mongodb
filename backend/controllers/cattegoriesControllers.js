
/* Import Model */
const { default: mongoose } = require('mongoose');
const Cattegory = require('../models/cattegoriesModels');

/* Create */
exports.createCattegory = (req,res, next) =>{
    const cattegory = req.body.cattegory

    /* Create */
    const Posting = new Cattegory({
        cattegory:cattegory,
    })
    /* Check create */
    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Cattegory Success',
            data: result
        })
    })
    .catch(err => {
        console.log('err: ', err)
    })
}

/* Read All */
exports.getAllCattegory = async (req, res) => {
    const cattegories = await Cattegory.find({}).sort({createdAt: -1})
    res.json(cattegories)
}

/* Read Detail */
exports.getSingleCattegory = async (req,res) => {
    const {id} = req.params
 
    if(!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(404).json({err: 'No such cattegory'})
    }
 
    const cattegory = await Cattegory.findById(id)
 
    if(!cattegory){
     return res.status(404).json({err : 'No Such cattegory'})
    }
 
    res.status(200).json(cattegory)
 }


/* Delete */
exports.deleteCattegory = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such cattegory'})
    }
    const cattegory = await Cattegory.findOneAndDelete({_id: id})

    if(!cattegory){
     return res.status(404).json({err : 'No Such cattegory'})
    }

    res.status(200).json(cattegory)
}