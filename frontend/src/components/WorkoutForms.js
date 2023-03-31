import { useState } from "react";
import axios from "axios";

/* Import Context */
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [cattegory, setCattegory] = useState('')
    const [image, setImage] = useState('')
    const [err, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    console.log(image,12)

    const handlechangeTitle = async (e) => { 
        e.preventDefault()
        setEmptyFields([])
        setTitle(e.target.value)
    }
    const handlechangeLoad = async (e) => { 
        e.preventDefault()
        setEmptyFields([])
        setLoad(e.target.value)
    }
    const handlechangeReps = async (e) => { 
        e.preventDefault()
        setEmptyFields([])
        setReps(e.target.value)
    }
    const handlechangeCattegory = async (e) => { 
        e.preventDefault()
        setEmptyFields([])
        setCattegory(e.target.value)
    }


    const handleClick = async () => {
        console.log(title, load, reps,cattegory, image, 19)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('load', load)
        formData.append('reps', reps)
        formData.append('cattegory', cattegory)
        formData.append('image', image)

        const response = await axios.post('/workouts/data', formData)

        const json = await response.json()

        .then((result) => {
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            console.log(result)
        })
        .catch((err) => {
            setError(json.err)
            setEmptyFields(json.emptyFields)
        });
    }
    

    
    return (
        <form className="create">
            <h3> Add new workouts </h3>

            <label>Exersize Title : </label>
            <input 
                type="text"
                onChange={handlechangeTitle}
                value={title}
                className={emptyFields.includes('title') ? 'err' : ''}
            />
            <label>Load (in kg) : </label>
            <input 
                type="number"
                onChange={handlechangeLoad}
                value={load}
                className={emptyFields.includes('load') ? 'err' : ''}
            />
            <label>Reps : </label>
            <input 
                type="number"
                onChange={handlechangeReps}
                value={reps}
                className={emptyFields.includes('reps') ? 'err' : ''}
            />
            <label>Cattegory : </label>
            <select  onChange={handlechangeCattegory}
                value={cattegory}
                className={emptyFields.includes('cattegory') ? 'err' : ''}>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
            </select>
            <div>
                <img 
                    src={image}
                    className= 'img-thumbnail' 
                    alt=''
                />
            </div>
            <label>Image</label>
            <input
                multiple 
                onChange={(e) => setImage(e.target.files[0])} 
                type="file"
                className="form-control"
                id="formFile"
                accept="image/*"
            />

            <button  onClick={handleClick}>Add Workout </button>
            {err && <div className="error">{err}</div>}
        </form>
    )
}


export default WorkoutForm