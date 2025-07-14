import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Register() {

  let { setUserLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  const onSubmit = async (values) => {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        if (data?.message === "success") {
          setUserLogin(data?.token);
          localStorage.setItem("userToken", data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error?.response?.data?.message);
        setErrMsg(error?.response?.data?.message);
      });
  };

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("email is required")
      .email("invalid email format"),
    password: Yup.string()
      .required("password is required")
      .min(6, "min 6 characters")
      .max(12, "max 12 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  // function validateInput(values) {
  //   let errors = {};
  //   if (values.name == "") {
  //     errors.name = "name is required";
  //   } else if (!/^([A-Z][a-z]{2,5})$/.test(values.name)) {
  //     errors.name = "name must start with capital letter min 3 max 6";
  //   }

  //   if (values.email == "") {
  //     errors.email = "email is req";
  //   }

  //   if (values.password == "") {
  //     errors.password = "password is required";
  //   }

  //   if (values.repassword == "") {
  //     errors.repassword = "password confirmation is required";
  //   } else if (values.password !== values.repassword) {
  //     errors.repassword = "Password confirmation is incorrect";
  //   }

  //   return errors;
  // }

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
              Sign in
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
                <p onClick={()=>{navigate("/forgetPass")}} className="my-4 cursor-pointer text-blue-600 text-[13px]">
                  forget password
                </p>
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-500 text-white py-2 px-4 text-sm font-medium shadow-sm  focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              {errMsg ? (
                <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
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
