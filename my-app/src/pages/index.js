import axios from "axios";

import Feed from "../components/Feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../Redux/slices/postsSlice";

export default function Home(props) {
  const { user } = props;
  return <Feed user={user} />;
}
