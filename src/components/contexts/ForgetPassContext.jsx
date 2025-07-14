import { createContext } from "react";
// import { ForgetPassContext } from './ForgetPass';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export let ForgetPassContext = createContext(0);

export default function ForgetPassContextProvider(props) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(0);

  // const getUserIdFromJWT = () => {
  //   try {
  //     const token = localStorage.getItem("userToken");

  //     if (!token) {
  //       console.log("No token found in localStorage");
  //       return null;
  //     }

  //     console.log("Token :", token);

  //     const payload = jwtDecode(token);
  //     console.log("JWT Payload:", payload);

  //     // setUserEmail(payload.email);
  //     console.log("User ID :", payload.id);

  //     return payload.id;
  //   } catch (error) {
  //     console.error("Error with jwt library:", error);
  //     return null;
  //   }
  // };

  async function fetchForgetPass(email) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: email,
        }
      );
      console.log("Forget pass response:", response?.data);
      return response;
    } catch (error) {
      console.error("Forget pass error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error; // Re-throw to handle in component
    }
  }

  async function FetchResetCode(resetCode) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: resetCode,
        }
      );
      console.log("Reset code response:", response?.data);
      return response;
    } catch (error) {
      console.error("Reset code error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error; // Re-throw to handle in component
    }
  }

  async function fetchResetPassword(email, newPassword) {
    let response = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: email,
        newPassword: newPassword,
      })
      .then((response) => {
        console.log("Reset password response:", response?.data);
        localStorage.setItem("userToken", response?.data?.token);
        return response;
      })
      .catch((error) => {
        console.error("Update password error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        return error;
      });
  }

  async function fetchUpdatePassword(currentPassword, password, rePassword) {
    let response = await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          currentPassword: currentPassword,
          password: password,
          rePassword: rePassword,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log("Update password response:", response?.data);
        setEmail(response?.data?.user?.email);
        setName(response?.data?.user?.name);
        localStorage.setItem("userToken", response?.data?.token);
        // getUserIdFromJWT()
        return response;
      })
      .catch((error) => {
        console.error("Update password error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error; // Re-throw to handle in component
      });

    return response;
  }

   async function fetchUpdateUserData(name, email, phone) {
    let response = await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          name: name,
          email: email,
          phone: phone,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log("Update user data response:", response?.data);
        setName(response?.data?.user?.name);
        setEmail(response?.data?.user?.email);
        setPhone(response?.data?.user?.phone);
        console.log(name , email, phone);
        
        // localStorage.setItem("userToken", response?.data?.token);
        // getUserIdFromJWT()
        return response;
      })
      .catch((error) => {
        console.error("Update user data error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      });

    return response;
  }

  return (
    <ForgetPassContext.Provider
      value={{
        name,
        email,
        fetchForgetPass,
        FetchResetCode,
        fetchResetPassword,
        fetchUpdatePassword,
        fetchUpdateUserData,
      }}
    >
      {props.children}
    </ForgetPassContext.Provider>
  );
}
