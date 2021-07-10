import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./slices/postsSlice";
import profileReducer from "./slices/profileSlice";
export default configureStore({
  reducer: {
    postsReducer: postsReducer,
    profileReducer: profileReducer,
  },
});
