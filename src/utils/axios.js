import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://vpath-testing.onrender.com/" ,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});