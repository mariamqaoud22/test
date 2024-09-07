import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

export default function Login() {
  const { setToken } = useContext(authContext);
  const { getUserCart } = useContext(CartContext);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let user = {
    password: "",
    email: "",
  };

  async function loginUser(values) {
    setIsClicked(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin ", values)
      .then(function (x) {
        // console.log('sa7', x.data.token);
        localStorage.setItem("tkn", x.data.token);
        setToken(x.data.token);

        getUserCart();

        setIsSuccess(true);
        setIsClicked(false);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      })
      .catch(function (x) {
        setErrorMessage(x.response.data.message);
        setIsClicked(false);

        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  }

  const loginFormik = useFormik({
    initialValues: user,

    onSubmit: loginUser,

    validationSchema: yup.object().shape({
      password: yup.string().required().min(6).max(12),
      email: yup.string().required("email is required"),
    }),
  });

  return (
    <>
      <div className="p-5 ">
        <h2 className="text-center">login Now :</h2>

        <form onSubmit={loginFormik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={loginFormik.values.email}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email{" "}
            </label>

            {loginFormik.errors.email && loginFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {loginFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={loginFormik.values.password}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>

            {loginFormik.errors.password && loginFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {loginFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="text-dark p-4 mb-4  bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            {!isClicked ? (
              "login"
            ) : (
              <CirclesWithBar
                height="30"
                width="30"
                color="#fff"
                outerCircleColor="#fff"
                innerCircleColor="#fff"
                barColor="#fff"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </button>
         
{/*           <button
            type="button"
            onClick={() => navigate('/ForgetPassword')} 
            className="text-dark bg-rose-700 block  hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
          >
           
              "Forget Password"
          </button> */}
        </form>
      </div>
    </>
  );
}
