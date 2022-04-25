import axios from "axios";

const $axios = axios.create({
  baseURL: "https://funny-kitten-f9e649.netlify.app/",
  withCredentials: true,
});

export default $axios;
