import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/user/Login/Login";
import { Home } from "./Pages/Home/Home";
import { Register } from "./Pages/user/Register/Register";
import { Profile } from "./Pages/Profile/Profile";
import { Following } from "./Pages/Following/Following";
import { Followers } from "./Pages/Followers/Followers";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
