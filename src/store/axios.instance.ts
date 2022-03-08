import axios from "axios";

const $axios = axios.create({
  baseURL: "https://felfala.herokuapp.com/",
  withCredentials: true,
});

export default $axios;
