import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../utilities/api";
import { useAuth } from "../../context/authContext";

const token = JSON.parse(localStorage.getItem("auth"))
  ? JSON.parse(localStorage.getItem("auth")).token
  : "";

const Axios = axios.create({
  baseURL: `${API_URL}/posts`,
  headers: {
    Authorization: token,
  },
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (number) => {
    const res = await Axios.get("/", {
      params: { pageNumber: number },
    });

    return { posts: res.data, number };
  }
);

export const submitNewPost = createAsyncThunk(
  "posts/submitNewPost",
  async (req) => {
    const res = await Axios.post("/", req);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const res = await Axios.delete(`/${postId}`);
    return postId;
  }
);

export const likePost = createAsyncThunk("posts/likePost", async (req) => {
  const { postId, userId, like } = req;

  if (like) {
    await Axios.post(`/like/${postId}`);
  } else {
    await Axios.put(`/unlike/${postId}`);
  }
  return { postId, like, userId };
});

export const postComment = createAsyncThunk(
  "posts/postComment",
  async ({ postId, text }) => {
    await Axios.post(`/comment/${postId}`, { text });
    return { postId, text };
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }) => {
    await Axios.delete(`/${postId}/${commentId}`);
    return { postId, commentId };
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      console.log(action.payload.posts);
      state.status = "succeeded";
      if (action.payload.number === 1) {
        state.posts = action.payload.posts;
      } else {
        state.posts = [...action.payload.posts, ...state.posts];
      }

      console.log(state.posts);
    },
    [submitNewPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [submitNewPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts.unshift(action.payload);
    },
    [submitNewPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deletePost.pending]: (state, action) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [likePost.pending]: (state, action) => {
      state.status = "loading";
    },

    [likePost.fulfilled]: (state, action) => {
      const { postId, like, userId } = action.payload;
      state.status = "succeeded";
      if (like) {
        state.posts = state.posts.map((item) =>
          item._id === postId
            ? { ...item, likes: item.likes.concat({ user: userId }) }
            : item
        );
      } else {
        state.posts = state.posts.map((item) =>
          item._id === postId
            ? {
                ...item,
                likes: item.likes.filter((curr) => curr.user !== userId),
              }
            : item
        );
      }
    },

    [likePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
