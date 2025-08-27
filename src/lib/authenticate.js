import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;

// ---------------------
// Token helpers
// ---------------------
function setToken(token) {
  // ensure we strip any "JWT " prefix and replace with Bearer when using
  const cleanToken = token.replace(/^JWT\s+/i, "");
  console.log("Storing token:", cleanToken);
  localStorage.setItem("access_token", cleanToken);
}

export function getToken() {
  return localStorage.getItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  return !!readToken();
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

// ---------------------
// Auth Header helper
// ---------------------
export function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------------------
// API calls
// ---------------------
export async function authenticateUser(userEmail, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userEmail, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(userName, userEmail, password, password2) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ userName, userEmail, password, password2 }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (res.status === 200 || data.message?.toLowerCase().includes("success")) {
    return true;
  } else {
    throw new Error(data.message);
  }
}

// ---------------------
// Forgot / Reset Password
// ---------------------
export async function requestPasswordReset(userEmail) {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ userEmail }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (res.ok) {
    return data.message || "OTP sent to your email";
  } else {
    throw new Error(data.message || "Failed to send OTP");
  }
}

export async function resetPasswordWithOtp(userEmail, otp, newPassword) {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    body: JSON.stringify({ userEmail, otp, newPassword }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (res.ok) {
    return data.message || "Password reset successfully";
  } else {
    throw new Error(data.message || "Failed to reset password");
  }
}
