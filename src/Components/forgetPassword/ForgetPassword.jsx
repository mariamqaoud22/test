import  { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
      });

    if (data.statusMsg === "success") {
      navigate("/VerificationCode");
    }
    console.log(data);
  }

  const validationSchema = yup.object({
    email: yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (<div className="mx-auto w-[85%] pt-5 pb-5">
    <h1 className="text-center text-2xl font-semibold mb-5">Reset Your Account Password</h1>
    
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center text-red-500">{error}</div>
      ) : null}
      
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-emerald-900"
        >
          Email:
        </label>
        <input
          className="shadow-sm bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your email"
          required
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger mt-2 p-2 text-red-500">
            {formik.errors.email}
          </div>
        ) : null}
      </div>
      
      <button
        disabled={!(formik.isValid && formik.dirty)}
        type="submit"
        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 "
      >
        Send
      </button>
    </form>
  </div>
  
    // <div className="forgetpassword py-5">
     
    //   {error ? (
    //     <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
    //   ) : null}
    //   <h2 className="mb-4">Forget Password</h2>
    //   <form onSubmit={formik.handleSubmit}>
    //     <div className="form-group mb-2">
    //       <label htmlFor="email" className="mb-1">
    //         Email:
    //       </label>
    //       <input
    //         className="form-control"
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formik.values.email}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.errors.email && formik.touched.email ? (
    //         <div className="alert alert-danger mt-2 p-2">
    //           {formik.errors.email}
    //         </div>
    //       ) : null}
    //     </div>
    //     <button
    //       disabled={!(formik.isValid && formik.dirty)}
    //       type="submit"
    //       className="btn bg-main text-white w-25  mt-4 d-block mx-auto">
    //       Send
    //     </button>
    //   </form>
    // </div>

  );
}
