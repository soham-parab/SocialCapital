import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pagessss/user/Login/Login";
import { Home } from "./Pagessss/Home/Home";
import { Register } from "./Pagessss/user/Register/Register";
import Profile from "./components/Profile/Profile";
import { Following } from "./Pagessss/Following/Following";
import { Followers } from "./Pagessss/Followers/Followers";
import Nav from "./components/Nav/Nav";
import Feed from "../src/pages/index";
import Explore from "./pages/explore";
import { useAuth } from "./context/authContext";

function App() {
  const { auth } = useAuth();

  console.log(localStorage.getItem("auth"));
  return (
    <div>
      <Nav />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/feed" element={<Feed />} />

          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
