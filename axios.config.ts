import axios from "axios";

export const TOKEN = "token";

const api = axios.create({
  baseURL: "https://api.betkumi.com/auth",
  timeout: 50000,
});

api.interceptors.request.use(config => {
  const newConfig = { ...config };
  const authToken = localStorage.getItem(TOKEN);

  if (newConfig.headers)
    newConfig.headers.authorization = `Bearer ${authToken || ""}`;

  return newConfig;
}, error => Promise.reject(error));

export default api;