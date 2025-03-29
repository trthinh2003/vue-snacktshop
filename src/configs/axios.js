import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true;

export default axiosInstance;
