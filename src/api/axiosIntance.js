import axios from "axios";

const axiosInstance = axios.create({
      //baseURL: "http://localhost:9000/",
      baseURL: "https://gestcafe-backend.onrender.com/",
      headers: {
            "Content-Type": "application/json",
      },
});

export default axiosInstance;
