// import "./index.css";
import Background from "./Components/Background";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<Background/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </h1>
  );
}

export default App;
