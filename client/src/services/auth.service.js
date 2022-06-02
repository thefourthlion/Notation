import axios from "axios";

// register a user
const signup = (
  firstName,
  lastName,
  username,
  email,
  phoneNumber,
  password
) => {
  return axios
    .post("http://localhost:3001/register", {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// login a user
const login = (username, password) => {
  return axios
    .post("http://localhost:3001/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
