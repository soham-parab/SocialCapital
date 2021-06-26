import axios from "axios";

export const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user._id,
      token: token,
    })
  );
};

// export const setupAuthHeader = (token) => {
//   if (token) {
//     return (axios.defaults.headers.common["authorization"] = token);
//   }
//   delete axios.defaults.headers.common["authorization"];
// };

// export const setupAuthHandler = (dispatch, signOut, navigate, toast) => {
//   axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error?.response?.status === 401) {
//         toast({
//           position: "bottom-right",
//           title: `Session Expired`,
//           description: "Please login again to continue.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//         dispatch(signOut());
//         navigate("login");
//       }
//       return Promise.reject(error);
//     }
//   );
// };
