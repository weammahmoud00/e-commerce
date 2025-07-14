import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ForgetPassContext } from "../../components/contexts/ForgetPassContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function UpdateUserData({ name: userName, email: userEmail , phone:userPhone }) {
  let navigate = useNavigate();
  let { fetchUpdateUserData } = useContext(ForgetPassContext);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const onSubmit = async (values) => {
    setLoading(true);
    setErrMsg(null);

    try {
      // Allow user to update any combination of fields
      // Use current values as fallback if field is empty
      const nameToUpdate = values.name.trim() || userName;
      const emailToUpdate = values.email.trim() || userEmail;
      const phoneToUpdate = values.phone.trim() || userPhone;

      let response = await fetchUpdateUserData(
        nameToUpdate,
        emailToUpdate,
        phoneToUpdate
      );

      console.log("Update user data response:", response);
        console.log(response?.data?.config?.headers?.token);
      if (response?.data?.message === "success") {
        toast.success("Data updated successfully", {
          duration: 3000,
          position: "top-right",
        });
        setErrMsg(null);
        navigate("/personal");
        return response;
      } else {
        setErrMsg(response?.data?.message || "Failed to update data");
        return null;
      }
    } catch (error) {
      console.error("Submit error:", error?.response?.data || error.message);
      setErrMsg(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email format"),
    phone: Yup.string().min(10, "Phone must be at least 10 digits"),
  });

  const formik = useFormik({
    initialValues: {
      name: userName || "",
      email: userEmail || "",
      phone: userPhone || "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-white 800 rounded-2xl shadow-lg border border-gray-200 700">
          <div className="p-8 relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600 400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Update Account Information
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  You can update any field you want. Leave fields empty to keep
                  current values.
                </p>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 flex items-center">
                  <label
                    htmlFor="name"
                    className="text-sm me-4 font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <div className="w-1/2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={`Current: ${userName || "Not set"}`}
                      className="w-full border border-gray-300 rounded-lg p-1 focus:outline-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex items-center">
                  <label
                    htmlFor="email"
                    className="text-sm me-4 font-medium text-gray-700"
                  >
                    Email Address:
                  </label>
                  <div className="w-1/2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={`Current: ${userEmail || "Not set"}`}
                      className="w-full border border-gray-300 rounded-lg p-1 focus:outline-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium me-4 text-gray-700">
                    Password :{" "}
                    <Link to={"/updatePass"} className="text-blue-600">
                      Update Password
                    </Link>
                  </label>
                </div>

                <div className="space-y-2 flex items-center">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium me-4 text-gray-700"
                  >
                    Phone:
                  </label>
                  <div className="w-1/2">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter new phone number"
                      className="w-full border border-gray-300 rounded-lg p-1 focus:outline-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-9">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/personal")}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

              {errMsg && (
                <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    ></path>
                  </svg>
                  <span className="text-red-800">{errMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
