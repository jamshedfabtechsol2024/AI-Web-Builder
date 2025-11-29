import Cookies from "js-cookie";

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  try {
    // Decode JWT token payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired
    return payload.exp > currentTime;
  } catch {
    // If token is malformed, consider it invalid
    return false;
  }
};

export const getAccessToken = () => Cookies.get("access_token");

export const getRefreshToken = () => Cookies.get("refresh_token");

export const isUserAuthenticated = (user, accessToken) => {
  // Check if user exists and has required properties
  const hasValidUser = user?.id && user?.email && user?.role;
  if (!hasValidUser) {
    return false;
  }

  // Check if access token exists and is valid
  const hasValidToken = accessToken && isTokenValid(accessToken);
  if (!hasValidToken) {
    return false;
  }

  return true;
};

export const hasRole = (user, roles) => {
  const hasUserAndRole = user?.role;
  if (!hasUserAndRole) {
    return false;
  }

  if (Array.isArray(roles)) {
    return roles.includes(user.role);
  }

  return user.role === roles;
};

export const getDashboardRoute = (user) => {
  const hasUserAndRole = user?.role;
  if (!hasUserAndRole) {
    return "/auth/login";
  }

  switch (user.role) {
    case "developer": {
      return "/developer/dashboard";
    }
    case "admin": {
      return "/admin/dashboard";
    }
    case "user": {
      return "/recently";
    }
    default: {
      return "/auth/login";
    }
  }
};
