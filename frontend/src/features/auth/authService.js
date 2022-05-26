import axios from "axios";

const API_URL = "/api/v1/users";

//Logout user
const logout = () => {
  localStorage.removeItem("user");
};

//Register user

const register = async userData => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//Login user

const login = async userData => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
