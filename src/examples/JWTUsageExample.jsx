

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function JWTUsageExample() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return null;

      const decoded = jwtDecode(token);
      
      return decoded.userId || decoded.id || decoded.sub || decoded._id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const getUserInfo = () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return null;

      const decoded = jwtDecode(token);
      
      return {
        id: decoded.userId || decoded.id || decoded.sub || decoded._id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        exp: decoded.exp,
        iat: decoded.iat
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const isTokenExpired = () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return true;

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        // Check if token is valid
        if (isTokenExpired()) {
          console.log('Token is expired, redirecting to login...');
          localStorage.removeItem('userToken');
          return;
        }

        const userInfo = getUserInfo();
        if (userInfo) {
          setUserInfo(userInfo);
          console.log('User info from JWT:', userInfo);

          const userId = getUserId();
          if (userId) {
            console.log('Fetching data for user ID:', userId);

          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      const response = await fetch(`/api/orders/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const orders = await response.json();
      console.log('User orders:', orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!userInfo) {
    return <div>No user data found. Please login.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">JWT Usage Example</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">User Information from JWT:</h3>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>ID:</strong> {userInfo.id}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Token Information:</h3>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Issued At:</strong> {new Date(userInfo.iat * 1000).toLocaleString()}</p>
            <p><strong>Expires At:</strong> {new Date(userInfo.exp * 1000).toLocaleString()}</p>
            <p><strong>Is Expired:</strong> {isTokenExpired() ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <button 
          onClick={fetchUserOrders}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch User Orders
        </button>
      </div>
    </div>
  );
}

export { getUserId, getUserInfo, isTokenExpired };
