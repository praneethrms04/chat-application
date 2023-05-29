import axios from "axios";

/*
USERS: 
GET : api 
url : /api/user/search?{name or email}
params : search 
 */

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUser = async (search) => {
  return await axios.get(`${BASE_URL}/api/user?search=${search}`);
};

export const fetchAllUsers = async () => {
  return await axios.get(`${BASE_URL}/api/user?search=`);
};
