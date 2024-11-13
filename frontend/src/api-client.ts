import { RegisterFormData } from "./pages/Register";
import { SingInDataForm } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (data: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resBody = await res.json();
  if (!res.ok) {
    throw new Error(resBody.message);
  }
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Token Invalid");
  }
  const resBody = await res.json();
  return resBody;
};

export const signIn = async (data: SingInDataForm) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message);
  }
};

export const singOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Error during sign out");
  }
};
