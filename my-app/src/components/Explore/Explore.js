import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utilities/api";
import { useAuth } from "../../context/authContext";
import styles from "../../styles/Explore.module.css";
import { Button, Image, List, Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileStats,
  followUser,
  unFollowUser,
} from "../../Redux/slices/profileSlice";

function Explore({ user }) {
  const { auth } = useAuth();
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const profileData = useSelector((state) => state.profileReducer);
  console.log(profileData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileStats(auth.user.username));
  }, []);

  function isAlreadyFollowed(userId) {
    return (
      profileData.profile.following &&
      profileData.profile.following.filter((item) => item === userId).length > 0
    );
  }

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);
    if (value) {
      try {
        const token = JSON.parse(localStorage.getItem("auth")).token;
        const res = await axios.get(`${API_URL}/search/${value}`, {
          headers: { Authorization: token },
        });
        setResults(res.data);
      } catch (error) {
        console.log("Error Searching");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Explore</span>
      </div>
      <div className={styles.body}>
        <Input
          fluid
          icon="users"
          iconPosition="left"
          placeholder="Search nerds to connect..."
          value={text}
          onChange={handleChange}
        />
        <List divided verticalAlign="middle">
          {results.map((profile) => (
            <List.Item>
              <List.Content floated="right">
                {isAlreadyFollowed(profile._id) ? (
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(unFollowUser(profile._id));
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(followUser(profile._id));
                    }}
                  >
                    Follow
                  </Button>
                )}
              </List.Content>
              <Image avatar src={profile.profilePicUrl} />
              <List.Content>{profile.name}</List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Explore;
