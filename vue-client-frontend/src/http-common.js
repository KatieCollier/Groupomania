import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "multipart/form-data",
    "Authorization": localStorage.getItem("token")
  }
});
