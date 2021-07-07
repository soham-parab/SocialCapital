import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utilities/api";
const postsSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
});

export const fetchPosts = createAsyncThunk("post/fetchposts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  // console.log("l",response);
  return response.data;
});

export const post = createAsyncThunk("post/post", async (postobj) => {
  const response = await axios.post(`${API_URL}/posts`, postobj);

  return response.data;
});

export const postDelete = createAsyncThunk(
  "post/postDelete",
  async (deleteObj) => {
    const response = await axios.delete(`${API_URL}/posts`, {
      data: deleteObj,
    });
    return response.data;
  }
);

export default postsSlice.reducer;
