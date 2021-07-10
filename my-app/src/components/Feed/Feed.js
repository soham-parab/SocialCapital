import Postbox from "./Postbox";
import { useState, useEffect } from "react";
import styles from "../../styles/Postbox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../Redux/slices/postsSlice";
import { useAuth } from "../../context/authContext";

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

  return <h1>hjdias</h1>;
}

export default Feed;
