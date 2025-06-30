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

function handleApiError(err: any): never {
  if (err.response?.data?.message) {
    if (err.response.data.errors?.path) {
      throw new Error(
        `${err.response.data.message}:
        ${err.response.data.errors.path} 
        ${err.response.data.errors.message}`
      );
    }
    throw new Error(err.response.data.message);
  }
  throw new Error("Sth went wrong. Please try again.");
}

export async function register({
  phone,
  password,
}: Payload): Promise<User> {
  try {
    const { data: user } = await api.post<User>("/register", {
      phone,
      password,
    });
    return user;
  } catch (err: any) {
    handleApiError(err);
  }
}

export async function login({
  phone,
  password,
}: Payload): Promise<User> {
  try {
    const { data: user } = await api.post<User>("/login", {
      phone,
      password
    });
    return user;
  } catch (err: any) {
    handleApiError(err);
  }
}

export async function refresh(token: { token: string }): Promise<User> {
  try {
    const { data: user } = await api.post<User>("/refresh", {
      token
    });
    return user;
  } catch (err: any) {
    handleApiError(err);
  }
}

export async function logout(): Promise<void> {
  try { 
    await api.get("/logout");
  } catch (err: any) {
    handleApiError(err);
  }
}

if (typeof window !== "undefined") {
  (window as any).Auth = {
    login,
    register,
    logout,
    refresh,
  };
}