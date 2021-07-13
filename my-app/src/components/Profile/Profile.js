import { useState, useEffect } from "react";
import styles from "../../styles/Feed.module.css";
import Post from "./Post";
import Cover from "./Cover";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchProfileStats } from "../../Redux/slices/profileSlice";

function Profile({ username, user }) {
  const profileData = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(username));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{username}</span>
      </div>
      <Cover username={username} />
      {profileData.posts.map((post) => (
        <Post postId={post._id} user={user} />
      ))}
      <div style={{ height: "4rem" }}></div>
    </div>
  );
}

export default Profile;
