import AXIOS from "axios";

export const axios = AXIOS.create({
  baseURL: "http://localhost:3000/api",
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axios;