import { useState } from "react";
import axios from "axios";

const WorkoutFormCloud = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [image, setImage] = useState('')
    console.log(image,12)

    const handlechangeTitle = async (e) => { 
        e.preventDefault()
        setTitle(e.target.value)
    }
    const handlechangeLoad = async (e) => { 
        e.preventDefault()
        setLoad(e.target.value)
    }
    const handlechangeReps = async (e) => { 
        e.preventDefault()
        setReps(e.target.value)
    }

    const handleClick = async () => {
        console.log(title, load, reps, image, 19)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('load', load)
        formData.append('reps', reps)
        formData.append('image', image)

        axios.post('/workouts/data', formData)

        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
           <input value={title} onChange={handlechangeTitle} placeholder="title"/>
            <input value={load} onChange={handlechangeLoad} placeholder='load'/>
            <input value={reps} onChange={handlechangeReps} placeholder='reps'/>
            <input multiple onChange={(e) => setImage(e.target.files[0])} type="file"/>
            
            <button
                onClick={handleClick}
            >
            Add Workout
            </button>
        </div>
    )
}

export default WorkoutFormCloud