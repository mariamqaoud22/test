import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerificationCode() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
      });

    if (data.status === "Success") {
      navigate("/ResetPassword");
    }
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("This field is required")
      .matches(/^[0-9]{3,10}$/, "Enter numbers only"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


  return  <>
<div className="mx-auto w-[85%] pt-5 pb-5">
  <h1 className="text-center text-2xl font-semibold mb-5">Reset Your Account Password</h1>

  <form onSubmit={formik.handleSubmit} className="space-y-4">
    {error ? (
      <div className="alert alert-danger mb-3 p-2 text-center text-red-500">{error}</div>
    ) : null}
    
    <div className="mb-5">
      <label
        htmlFor="resetCode"
        className="block mb-2 text-sm font-medium text-emerald-900"
      >
        Reset Code:
      </label>
      <input
        type="text"
        id="resetCode"
        name="resetCode"
        value={formik.values.resetCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-sm bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-[90%] p-2.5"
        placeholder="Enter reset code"
        required
      />
      {formik.errors.resetCode && formik.touched.resetCode ? (
        <div className="alert alert-danger mt-2 p-2 text-red-500">
          {formik.errors.resetCode}
        </div>
      ) : null}
    </div>

    <button
      disabled={!(formik.isValid && formik.dirty)}
      type="submit"
      className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 "
    >
      Verify
    </button>
  </form>
</div>


  {/* <div>
    <form className="mx-auto w-[85%] pt-5 pb-5">
      <h1>reset your account password</h1>
      <div className="mb-5">
        <label
          htmlFor="code"
          className="block mb-2 text-sm font-medium text-emerald-900"
        >
         
        </label>
        <input
          type="number"
          id="code"
          className="shadow-sm bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-[90%] p-2.5"
          placeholder=" Code"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Verify
      </button>
    </form>
  </div> */}
</>
   

}


