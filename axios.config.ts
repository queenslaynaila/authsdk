import axios from "axios";

const api = axios.create({
  baseURL: "https://api.betkumi.partners/auth",
  timeout: 50000,
  withCredentials: true
});

export default api;