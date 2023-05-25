import axios from "axios";

/*
SIGNUP: 
POST : api 
url : /api/user/signup
data : name, email, password, picture
 */

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const userSignup = async (data) => {
  return await axios.post(`${BASE_URL}/api/user/signup`, data);
};

/*
LOGIN: 
POST : api 
url : /api/user/LOGIN
data :  email, password
 */

export const userLogin = async (data) => {
  return await axios.post(`${BASE_URL}/api/user/login`, data);
};
