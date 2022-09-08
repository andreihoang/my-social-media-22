import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL = 'https://my-social-22.herokuapp.com/'
// })

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});
