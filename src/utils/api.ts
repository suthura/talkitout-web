import axios from "axios";

export const API_URL = "https://talkitoutapp-nodejs-api.azurewebsites.net";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.replace("/");
      return Promise.reject("Unauthorized");
    }
    // Handle other errors here
    return Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: API_URL,
  headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export default api;
