import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/user/Login/Login";
import Home from "./Pages/Home/Home";
import Register from "./Pages/user/Register/Register";
import UserHome from "./Pages/user/UserHome/UserHome";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userhome" element={<UserHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
