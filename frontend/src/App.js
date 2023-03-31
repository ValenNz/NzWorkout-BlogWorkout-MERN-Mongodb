import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkoutFormCloud from "./components/WorkoutFormCloud";

/* Call Pages */
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
                path = "/"
                element={<Home/>}
            />
            <Route
                path = "/add-workout"
                element={<WorkoutFormCloud/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
