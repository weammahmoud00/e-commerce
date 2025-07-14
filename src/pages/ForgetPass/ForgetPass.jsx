import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ForgetPassContext } from "../../components/contexts/ForgetPassContext";


export default function ForgetPass() {
  let { fetchForgetPass, FetchResetCode } = useContext(ForgetPassContext);

  const [loading, setLoading] = useState(false);
  const [fetchedP, setFetchedP] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  async function handleResetCode(resetCode) {
    try {
      let response = await FetchResetCode(resetCode);
      console.log("Reset code response:", response?.data);

      if (response?.data?.status === "Success") {
        navigate("/resetPassword");
        return response;
      } else {
        setErrMsg(response?.data?.message || "Invalid or expired reset code");
        return null;
      }
    } catch (error) {
      console.error(
        "Reset code error:",
        error?.response?.data || error.message
      );
      setErrMsg(
        error?.response?.data?.message || "Failed to verify reset code"
      );
      return null;
    }
  }

  const onSubmit = async (values) => {
    setLoading(true);
    setErrMsg(null);

    try {
      if (!fetchedP) {
        let response = await fetchForgetPass(values.email);
        console.log("Forget password response:", response?.data);

        if (response?.data?.statusMsg === "success") {
          setFetchedP(true);
          console.log(fetchedP,"fetchedP");
          
          setErrMsg(null);
        } else {
          setErrMsg(response?.data?.message || "Failed to send reset code");
        }
    } else {
        await handleResetCode(values.resetCode);
        console.log("handleResetCode");
        
        if (!values.resetCode || values.resetCode.trim() === "") {
          setErrMsg("Please enter the reset code");
          setLoading(false);
          return;
        }

      }
    } catch (error) {
      console.error("Submit error:", error?.response?.data || error.message);
      setErrMsg(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      {fetchedP ? (
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
            <div className="bg-white shadow-md rounded-md p-4">
              <img
                className="mx-auto h-12 w-auto"
                src="https://www.svgrepo.com/show/499664/user-happy.svg"
              />
              <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
                Enter Reset Code
              </h2>
              <p className="text-center text-sm text-gray-600 mb-4">
                Please enter the reset code sent to your email
              </p>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="resetCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    code
                  </label>
                  <div className="mt-1">
                    <input
                      id="resetCode"
                      value={formik.values.resetCode}
                      onChange={formik.handleChange}
                      name="resetCode"
                      type="text"
                      className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* alert */}
                {formik.errors.resetCode && formik.touched.resetCode ? (
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
                      {formik.errors.resetCode}
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
                      "Verify Code"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFetchedP(false)}
                    className="flex w-full justify-center rounded-md border border-gray-300 bg-white text-gray-700 py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Back to Email
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
      ) : (
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
            <div className="bg-white shadow-md rounded-md p-4">
              <img
                className="mx-auto h-12 w-auto"
                src="https://www.svgrepo.com/show/499664/user-happy.svg"
              />
              <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
                Reset Password
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
                      onBlur={formik.handleBlur}
                      name="email"
                      type="email-address"
                      className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* alert */}
                {formik.errors.email && formik.touched.email ? (
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
                    <span className="text-red-800">{formik.errors.email}</span>
                  </div>
                ) : null}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-green-500 text-white py-2 px-4 text-sm font-medium shadow-sm  focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                    ) : (
                      "Send code"
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
      )}
    </>
  );
}
