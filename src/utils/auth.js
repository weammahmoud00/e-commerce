/**
 * Authentication utility functions using jwt-decode library
 */

import { jwtDecode } from 'jwt-decode';

/**
 * Decode JWT token and extract user information
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;

    // Use jwt-decode library for reliable decoding
    const decodedPayload = jwtDecode(token);

    return decodedPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Get user ID from stored JWT token
 * @returns {string|null} - User ID or null if not found
 */
export const getUserId = () => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.log("No token found in localStorage");
      return null;
    }
    
    const decodedPayload = decodeToken(token);
    if (!decodedPayload) {
      console.log("Failed to decode token");
      return null;
    }
    
    console.log("Decoded token payload:", decodedPayload);
    
    // Try different possible field names for user ID
    const userId = 
      decodedPayload.userId || 
      decodedPayload.id || 
      decodedPayload.sub || 
      decodedPayload._id ||
      decodedPayload.user_id ||
      decodedPayload.user?.id ||
      decodedPayload.user?._id;
    
    console.log("Extracted user ID:", userId);
    
    if (!userId) {
      console.warn("No user ID found in token payload. Available fields:", Object.keys(decodedPayload));
    }
    
    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

/**
 * Get user information from stored JWT token
 * @returns {object|null} - User info or null if not found
 */
export const getUserInfo = () => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    
    const decodedPayload = decodeToken(token);
    if (!decodedPayload) return null;
    
    return {
      id: getUserId(),
      email: decodedPayload.email || decodedPayload.user?.email,
      name: decodedPayload.name || decodedPayload.user?.name,
      role: decodedPayload.role || decodedPayload.user?.role,
      ...decodedPayload
    };
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return false;
  
  try {
    const decodedPayload = decodeToken(token);
    if (!decodedPayload) return false;
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decodedPayload.exp && decodedPayload.exp < currentTime) {
      console.log("Token is expired");
      localStorage.removeItem("userToken");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

/**
 * Get authorization headers for API requests
 * @returns {object} - Headers object with token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken");
  return {
    headers: {
      token: token,
      Authorization: `Bearer ${token}`,
    }
  };
};

/**
 * Logout user by clearing stored data
 */
export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userLogin");
  // Clear any other user-related data
  window.location.href = "/login";
};
