require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require('path') // unutk meengetahui posisi folder dimana


// Add body-parser middleware
app.use(cors())
app.use(bodyParser.json());
app.use('/images', express.static('images'))

/* Upload */
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images') // call back (success akan kirim ke folder image) kalau di src maka src/images
    },
    filename: (req,file, cb) => {
        cb(null,new Date().getTime() + '-' + file.originalname)// format penamaan file
    }
})


/* Membuat file baru untuk menyimpan file iumage */
const fileFilter = (req,file,cb)=> {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' 
    ){  
        cb(null, true) // acc filer
    } else {
        cb(null, false) // tolak file
    }
}

app.use('/images', express.static(path.join(__dirname, 'images'))) // dirname (lokasi project berda) jika terjadi pemanggilan url maka akan melakukan tindakan membuat folder static untuk diakases diluar
app.use(multer({storage: fileStorage, fileFilter:fileFilter}).single('image')) // menentukan opengiuriman singgle dan harus bernama image
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE, OPTIONS ')
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type Authorization')
    next() 
})

/* Routes */
const workoutsRoutes = require('./routes/workoutsRoutes')
app.use('/workouts', workoutsRoutes)

// const cattegoriesRoutes = require('./routes/cattegoriesRoutes')
// app.use('/cattegories', cattegoriesRoutes)

/* Conenction to database and server */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connection to Database and Listening on port', process.env.PORT)
    })
}) .catch((err) => {
    console.log(err)
})
