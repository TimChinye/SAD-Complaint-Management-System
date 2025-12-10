// The base URL for your running service-authentication
const API_URL = 'http://localhost:8001/api/auth/';

/**
 * Makes a POST request to the login endpoint using the browser's native fetch API.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The JSON response from the server.
 * @throws {Error} Throws an error if the network response is not ok.
 */
const login = async (email, password) => {
  const response = await fetch(API_URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // If the server response is 4xx or 5xx, try to parse the error message
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

/**
 * Removes the user's token from local storage, effectively logging them out.
 */
const logout = () => {
  localStorage.removeItem('user');
};

/**
 * Retrieves the stored user object (which includes the token) from local storage.
 * @returns {object|null} The user object or null if not found.
 */
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error("Could not parse user from local storage:", e);
      return null;
    }
  }
  return null;
};

/**
 * A helper function to safely decode the JWT payload and extract the user's role.
 * @returns {string|null} The user's role (e.g., 'system_admin') or null.
 */
const getUserRole = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    try {
      const payloadBase64 = user.token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const payload = JSON.parse(decodedPayload);
      return payload.role;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }
  return null;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getUserRole,
};

export default authService;