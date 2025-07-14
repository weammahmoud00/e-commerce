import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ForgetPassContext } from "../contexts/ForgetPassContext";

export default function ResetPassword() {

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  let { fetchResetPassword } =
    useContext(ForgetPassContext);

     const onSubmit = async (values) => {
        setLoading(true);
        setErrMsg(null);
        try {
            let response = await fetchResetPassword(values.email, values.newPassword);
            console.log("Reset password response token:", response?.data);
            
            navigate("/login");
        }catch (error) {
          console.error("Submit error:", error);
        } finally {
          setLoading(false);
        }
      };
    
      let validationSchema = Yup.object().shape({
        email: Yup.string().required("email is required"),
        newPassword: Yup.string().required("newPassword is required"),
      });
    
      const formik = useFormik({
        initialValues: {
          email: "",
          newPassword: ""
        },
        validationSchema,
        onSubmit: onSubmit,
      });
  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-4">
          <div className="bg-white shadow-md rounded-md p-4">
            <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
            />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Enter the below data
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    type="text"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* alert */}
              {formik.errors.email &&
              formik.touched.email ? (
                <div className="bg-red-200 px-6 py-4  my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    ></path>
                  </svg>
                  <span className="text-red-800">
                    {formik.errors.email}
                  </span>
                </div>
              ) : null}


              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    name="newPassword"
                    type="text"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* alert */}
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <div className="bg-red-200 px-6 py-4  my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    ></path>
                  </svg>
                  <span className="text-red-800">{formik.errors.newPassword}</span>
                </div>
              ) : null}


     
              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-500 text-white py-2 px-4 text-sm font-medium shadow-sm  focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    "Submit"
                  )}
                </button>

              </div>

              {errMsg ? (
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
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

