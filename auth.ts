import api from "./axios.config";

type Payload = {
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

export async function register({
  phone,
  password,
}: Payload): Promise<User> {
  try {
    const res = await api.post("/register", {
      phone,
      password
    });
    const user: User = res.data;
    return user;
  } catch (err: any) {
    if (err.response && err.response.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Signup has failed. Please try again.");
  }
}

export async function login({
  phone,
  password,
}: Payload): Promise<User> {
  try {
    const res = await api.post("/login", { phone, password });
    const user: User = res.data;
    return user;
  } catch (err: any) {
    if (err.response && err.response.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Login failed. Please try again.");
  }
}

export async function logout(): Promise<void> {
  await api.post("/logout");
}

export async function refresh(token: string): Promise<User> {
  const res = await api.post("/refresh", { token });
  const user: User = res.data;
  return user;
}

if (typeof window !== "undefined") {
  (window as any).Auth = {
    login,
    register,
    logout,
    refresh,
  };
}