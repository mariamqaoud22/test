import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from 'yup';

  
export default function Register() {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  




  let user = {
      name: '',
      phone: '',
      password: '',
      rePassword: '',
      email: '',
  }

  async function registerUser(values) {

    // console.log('ggggg', values);

    // try {
    // console.log('res' , data);

    // } catch (error) {
    //   console.log('error' , error.response.data.message);


    // }
    // console.log( data.response.data.message);
    setIsClicked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup ', values).then(function (x) {
            // console.log('sa7' , x);
            setIsSuccess(true);
    setIsClicked(false);
            setTimeout(() => {
              navigate('/login')
            }, 2000);

          })
          .catch(function (x) {
            // console.log('8lt' , x);
            // x.response.data.message
            setErrorMessage(x.response.data.message);
    setIsClicked(false);

            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);

          });
  }


  const validationSchema = yup.object({
    name: yup.string()
      .min(3, "Min length is 3 chars")
      .max(20, "Max length is 16 chars")
      .required("This field is required"),
    email: yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
    phone: yup.string()
      .required("This field is required")
      .matches(/^01[0125][0-9]{8}$/i, "Enter a valid phone number"),
    password: yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "Enter a valid password"),
    rePassword: yup.string()
      .required("This field is required")
      .oneOf([yup.ref("password")], "Password and rePassword must be the same"),
  });

const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerUser,
  });







  return (<>
    <div className="p-5 ">



      {isSuccess ? <div className="p-4 mb-4 text-sm text-sky-500 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        congratulations
      </div> : ''}

      {errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        {errorMessage}
      </div> : ''}




      <h2 className="text-center">Register Now :</h2>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="name" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name </label>


          {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}

          </div> : ""}




          </div>

        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>


          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}

          </div> : ""}


        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>


          {formik.errors.password && formik.touched.password  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}

          </div> : ""}




        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-password</label>

          {formik.errors.rePassword && formik.touched.rePassword  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.rePassword}

          </div> : ""}



        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel"
              pattern="/^?01[0125][0-9]{8}$/"
              name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone </label>


            {formik.errors.phone && formik.touched.phone  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}

            </div> : ""}


          </div>

        </div>
        <button type="submit" className="text-dark bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">

          {! isClicked ? 'Submit' : <CirclesWithBar
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
          />}





        </button>
      </form>


    </div>












  </>)
}
