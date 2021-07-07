import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postsReducer from "./slices/postsSlice";
import profileReducer from "./slices/profileSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    profile: profileReducer,
  },
});
