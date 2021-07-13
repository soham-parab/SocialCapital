import Postbox from "./Postbox";
import { useState, useEffect } from "react";
import styles from "../../styles/Postbox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../Redux/slices/postsSlice";
import { useAuth } from "../../context/authContext";
import Post from "./Post";
function Feed() {
  const { auth } = useAuth();
  const postsData = useSelector((state) => state.postsReducer);
  console.log(JSON.parse(localStorage.getItem("auth")).token);
  console.log(postsData);
  console.log(auth.user);

  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("adsa");
    dispatch(fetchPosts(1));
  }, []);

  const fetchDataOnScroll = async () => {
    dispatch(fetchPosts(pageNumber));
    setPageNumber((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Home</span>
      </div>
      <Postbox user={auth.user} />

      {postsData.posts.map((post) => (
        <Post postId={post._id} user={auth.user} />
      ))}

      <div style={{ height: "4rem" }}></div>
    </div>
  );
}

export default Feed;
