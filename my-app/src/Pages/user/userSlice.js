import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Login = createAsyncThunk(
  "user/login",
  async (userCredentials, thunkAPI) => {
    const response = await axios.post(
      `https://socialcapital-rest-api.herokuapp.com/login`,
      userCredentials
    );
    return response.data;
  }
);
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axios.get(
      `https://socialcapital-rest-api.herokuapp.com/login/users`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      state.loggedInUser = null;
      state.status = "idle";
      state.error = null;
    },
    updateUser: (state, action) => {
      const userUpdates = action.payload;
      Object.keys(userUpdates).forEach((key) => {
        if (key in state.loggedInUser) {
          state.loggedInUser[key] = userUpdates[key];
        }
      });
    },
  },
  extraReducers: {
    [Login.pending]: (state, action) => {
      state.status = "loading";
    },
    [Login.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.status = "idle";
    },
    [Login.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [fetchUserData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.status = "idle";
    },
    [fetchUserData.rejected]: (state, action) => {
      console.log("rejected", state, action);
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
