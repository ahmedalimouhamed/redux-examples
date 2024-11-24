import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime; // Token is valid if its expiration time is in the future
  } catch (error) {
    return false; // Invalid token
  }
};
