import api from "./axios.config";

let accessToken: string | null = null;

function loadToken() {
  accessToken = localStorage.getItem("access_token");
}

function saveToken(token: string) {
  accessToken = token;
  localStorage.setItem("access_token", token);
}

function clearToken() {
  accessToken = null;
  localStorage.removeItem("access_token");
}

loadToken();

type LoginPayLoad = {
  phone: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  role: string;
  status: string;
  country: string;
  phone: string;
  created_at: string;
};

export async function login({ phone, password }: LoginPayLoad): Promise<User> {
  const res = await api.post("/auth/login", { phone, password });
  const user: User = res.data;
  const token = res.headers["authorization"]?.replace("Bearer ", "");

  if (!token) throw new Error("Missing token in response header");

  saveToken(token);
  return user;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
  clearToken();
}

export async function refresh(token: string): Promise<User> {
  const res = await api.post("/auth/refresh", { token });
  const user: User = res.data;
  saveToken(res.headers["authorization"]?.replace("Bearer ", "") || "");
  return user;
}
