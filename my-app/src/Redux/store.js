import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Pages/user/userSlice";
export default configureStore({
  reducer: {
    user: userReducer,
  },
});
