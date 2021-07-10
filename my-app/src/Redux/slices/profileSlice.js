import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../utilities/api";

const Axios = axios.create({
  baseURL: `${API_URL}/posts`,
  headers: {
    Authorization: JSON.parse(localStorage.getItem("auth")).token,
  },
});

export const fetchPosts = createAsyncThunk(
  "profile/fetchPosts",
  async (username) => {
    const res = await Axios.get(`/posts/${username}`);
    return res.data;
  }
);

export const fetchProfileStats = createAsyncThunk(
  "profile/fetchProfileStats",
  async (username) => {
    const res = await Axios.get(`/${username}`);
    return res.data;
  }
);

export const followUser = createAsyncThunk(
  "profile/followUser",
  async (userId) => {
    const res = await Axios.post(`/follow/${userId}`);
    return userId;
  }
);

export const unFollowUser = createAsyncThunk(
  "profile/unFollowUser",
  async (userId) => {
    const res = await Axios.put(`/unfollow/${userId}`);
    return userId;
  }
);

export const profileSlice = createSlice({
  name: "profileData",
  initialState: {
    posts: [],
    profile: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchProfileStats.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProfileStats.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.profile = action.payload;
    },
    [fetchProfileStats.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [followUser.pending]: (state, action) => {
      state.status = "loading";
      state.profile.following = [...state.profile.following, action.meta.arg];
    },
    [followUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [followUser.rejected]: (state, action) => {
      state.status = "failed";
      state.profile.following = state.profile.following.filter(
        (item) => item !== action.meta.arg
      );
      state.error = action.error.message;
    },
    [unFollowUser.pending]: (state, action) => {
      state.status = "loading";
      state.profile.following = state.profile.following.filter(
        (item) => item !== action.meta.arg
      );
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [unFollowUser.rejected]: (state, action) => {
      state.status = "failed";
      state.profile.following = [...state.profile.following, action.meta.arg];
      state.error = action.error.message;
    },
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
