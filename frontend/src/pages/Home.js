import { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import WorkoutCattegory from "../components/WorkoutCattegory"


/* Import Component */
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForms"

/* Import Context */

const Home = () => {
 return (
    <div className="home">
        <WorkoutDetails/>
        <WorkoutForm/>
    </div>
 )
}

export default Home