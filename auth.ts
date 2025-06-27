import api from "./axios.config";

type RegisterPayload = {
  phone: string;
  password: string;
  username: string;
  promo_code?: string;
  reference?: string;
  referer?: string;
  campaign?: string;
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
  username,
  promo_code,
  reference,
  referer,
  campaign,
}: RegisterPayload): Promise<User> {
  try {
    const res = await api.post("/auth/register", {
      phone,
      password,
      username,
      promo_code,
      reference,
      referer,
      campaign,
    });
    const user: User = res.data;
    return user;
  } catch (err: any) {
    if (err.response && err.response.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Signup failed. Please try again.");
  }
}

type LoginPayLoad = {
  phone: string;
  password: string;
};

export async function login({
  phone,
  password,
}: LoginPayLoad): Promise<User> {
  try {
    const res = await api.post("/auth/login", { phone, password });
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
  await api.post("/auth/logout");
}

export async function refresh(token: string): Promise<User> {
  const res = await api.post("/auth/refresh", { token });
  const user: User = res.data;
  return user;
}

if (typeof window !== "undefined") {
  (window as any).Auth = {
    login,
    logout,
    refresh,
  };
}