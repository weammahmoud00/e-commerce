import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function JWTDebugger() {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [error, setError] = useState(null);

  const decodeJWT = (token) => {
    try {
      if (!token) {
        throw new Error("No token provided");
      }

      // Use jwt-decode library for reliable decoding
      const payload = jwtDecode(token);

      // For header, we still need manual decoding since jwt-decode only returns payload
      const parts = token.split(".");
      const header = parts.length >= 1 ? JSON.parse(atob(parts[0])) : {};

      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp && payload.exp < now;

      return {
        header,
        payload,
        isExpired,
        expiresAt: payload.exp
          ? new Date(payload.exp * 1000).toLocaleString()
          : "No expiration",
        issuedAt: payload.iat
          ? new Date(payload.iat * 1000).toLocaleString()
          : "Unknown",
      };
    } catch (error) {
      throw new Error(`Failed to decode JWT: ${error.message}`);
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const decoded = decodeJWT(token);
        setTokenInfo(decoded);
        setError(null);
      } else {
        setError("No token found in localStorage");
      }
    } catch (err) {
      setError(err.message);
      setTokenInfo(null);
    }
  }, []);

  const findUserIdFields = (payload) => {
    const possibleFields = [
      "userId",
      "id",
      "sub",
      "_id",
      "user_id",
      "uid",
      "userID",
    ];

    const foundFields = [];

    possibleFields.forEach((field) => {
      if (payload[field]) {
        foundFields.push({ field, value: payload[field] });
      }
    });

    // Check nested user object
    if (payload.user) {
      if (payload.user.id)
        foundFields.push({ field: "user.id", value: payload.user.id });
      if (payload.user._id)
        foundFields.push({ field: "user._id", value: payload.user._id });
    }

    return foundFields;
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <h3 className="text-red-800 font-semibold mb-2">JWT Debug Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!tokenInfo) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 m-4">
        <p className="text-gray-600">Loading token information...</p>
      </div>
    );
  }

  const userIdFields = findUserIdFields(tokenInfo.payload);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 m-4 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        🔍 JWT Token Debugger
      </h2>

      {/* Token Status */}
      <div
        className={`p-3 rounded-lg mb-4 ${
          tokenInfo.isExpired
            ? "bg-red-50 border border-red-200"
            : "bg-green-50 border border-green-200"
        }`}
      >
        <p
          className={`font-semibold ${
            tokenInfo.isExpired ? "text-red-800" : "text-green-800"
          }`}
        >
          Token Status: {tokenInfo.isExpired ? "❌ Expired" : "✅ Valid"}
        </p>
        <p className="text-sm text-gray-600">
          Issued: {tokenInfo.issuedAt} | Expires: {tokenInfo.expiresAt}
        </p>
      </div>

      {/* User ID Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          🆔 Possible User ID Fields
        </h3>
        {userIdFields.length > 0 ? (
          <div className="space-y-2">
            {userIdFields.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-200 rounded p-3"
              >
                <code className="text-blue-800 font-mono">
                  {item.field}: <span className="font-bold">{item.value}</span>
                </code>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-yellow-800">
              ❌ No standard user ID fields found
            </p>
          </div>
        )}
      </div>

      {/* Full Payload */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          📋 Full Token Payload
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded p-4 overflow-auto">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {JSON.stringify(tokenInfo.payload, null, 2)}
          </pre>
        </div>
      </div>

      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          🔧 Token Header
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded p-4">
          <pre className="text-sm text-gray-800">
            {JSON.stringify(tokenInfo.header, null, 2)}
          </pre>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          💡 How to Use This Information:
        </h4>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>Look at the "Possible User ID Fields" section above</li>
          <li>Use the field name and value in your code</li>
          <li>
            If no standard fields are found, check the "Full Token Payload" for
            custom fields
          </li>
          <li>Update your getUserId function to use the correct field name</li>
        </ol>
      </div>
    </div>
  );
}
