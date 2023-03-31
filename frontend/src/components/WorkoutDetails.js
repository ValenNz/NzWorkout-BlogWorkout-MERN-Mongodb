/* Date Fns  */
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react";
import axios from "axios";

function WorkoutDetails() {
  const [workouts, setWorkout] = useState([])

  useEffect(() => {
    getAllWorkout()
  }, [])

  const getAllWorkout =  async () => {
    const response = await axios.get("/workouts/datas")
    setWorkout(response.data)
  }

  const handleClick = async (id) => {
    try {
      await axios.delete(`/workouts/data/${id}`)
      getAllWorkout()
    } catch (err){
      console.log(err)
    }
  }
  return (
    <div className="columns mt-2 is-centered">
      <div className="column is-half">
        <table className="table is-striped is-fullwidth" >
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Nama</th>
              <th>Load</th>
              <th>Reps</th>
              <th>Cattegory</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="workout-details">
            {workouts.map((workout, index) => (
              <tr key={workout._id}>
                  <td>{index + 1}</td>
                  <td><img src={`http://localhost:4000/${workout.image}`} alt="previw"/></td>
                  <td>{workout.title}</td>
                  <td>{workout.load}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.cattegory}</td>
                  <td>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</td>
                  <td><span>Edit</span></td>
                  <td><span onClick={() => handleClick(workout._id)}>Delete</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkoutDetails