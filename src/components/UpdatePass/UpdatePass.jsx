import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ForgetPassContext } from "../../components/contexts/ForgetPassContext";
import toast from "react-hot-toast";

export default function ForgetPass() {
  let { fetchUpdatePassword } = useContext(ForgetPassContext);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  // async function handleUpdatePass(currentPassword, password, rePassword) {
  //   try {
  //     let response = await fetchUpdatePassword(currentPassword, password, rePassword);
  //     console.log("Update user logged password response:", response?.data);

  //     if (response?.data?.status === "success") {
  //       navigate("/personal");
  //       return response;
  //     } else {
  //       setErrMsg(response?.data?.message || "Invalid or expired reset code");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Update user logged passworderror:",
  //       error?.response?.data || error.message
  //     );
  //     setErrMsg(
  //       error?.response?.data?.message || "Failed to verify reset code"
  //     );
  //     return null;
  //   }
  // }

  const onSubmit = async (values) => {
    setLoading(true);
    setErrMsg(null);
    try {
      let response = await fetchUpdatePassword(
        values.currentPassword,
        values.password,
        values.rePassword
      );
      console.log("Update user logged password response:", response);
      console.log("Response data:", response?.data);
      console.log("Message:", response?.data?.message);

      if (response?.data?.message === "success") {
        formik.resetForm();
        toast.success("Password updated successfully", {
          duration: 3000,
          position: "top-right",
        });
        setErrMsg(null);
        navigate("/personal");
        return response;
      } else {
        setErrMsg(response?.data?.message || "Invalid password");
        return null;
      }
    } catch (error) {
      console.error("Submit error:", error?.response?.data || error.message);
      setErrMsg(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  let validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string().required("New password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
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
              Enter below data
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <div className="mt-1">
                  <input
                    id="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="currentPassword"
                    type="password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* alert */}
              {formik.errors.currentPassword &&
              formik.touched.currentPassword ? (
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
                    {formik.errors.currentPassword}
                  </span>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    type="password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* alert */}
              {formik.errors.password && formik.touched.password ? (
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
                  <span className="text-red-800">{formik.errors.password}</span>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  rePassword
                </label>
                <div className="mt-1">
                  <input
                    id="rePassword"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="rePassword"
                    type="password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* alert */}
              {formik.errors.rePassword && formik.touched.rePassword ? (
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
                    {formik.errors.rePassword}
                  </span>
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

                <button
                  onClick={() => navigate("/personal")}
                  type="button"
                  className="flex w-full justify-center rounded-md border border-gray-300 bg-white text-gray-700 py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Cancel
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
