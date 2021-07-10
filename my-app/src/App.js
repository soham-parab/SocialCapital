import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pagessss/user/Login/Login";
import { Home } from "./Pagessss/Home/Home";
import { Register } from "./Pagessss/user/Register/Register";
// import { Profile } from "./Pagessss/Profile/Profile";
import { Following } from "./Pagessss/Following/Following";
import { Followers } from "./Pagessss/Followers/Followers";
// import { ProfilePage } from "./pages/[username]";
// import { Landing } from "./pages/landing";
// import Feed from "../src/pages/index";
// import Explore from "./pages/explore";
import UserHome from "./Pagessss/user/UserHome/UserHome";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userhome" element={<UserHome />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          {/* <Route path="/feed" element={<Feed />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/landing" element={<Landing />} />
          <Route path="/explore" element={<Explore />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
