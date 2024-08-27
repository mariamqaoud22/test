import  { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const { data } = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch((err) => {
        setError(err.response.data.message);
      });

    if (data.token) {
      navigate("/Login");
    }
  }

  const validationSchema = yup.object({
    email: yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
    newPassword: yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "Enter a valid password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="mx-auto w-[85%] pt-5 pb-5">
  <h1 className="text-center text-2xl font-semibold mb-5">Reset Your account password
  </h1>

  <form onSubmit={formik.handleSubmit} className="space-y-4">
    {error ? (
      <div className="text-red-500 text-center mb-3 p-2 border border-red-500 rounded">
        {error}
      </div>
    ) : null}
    
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-emerald-900"
      >
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-sm bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
        placeholder="Enter your email"
      />
      {formik.errors.email && formik.touched.email ? (
        <div className="text-red-500 mt-2 p-2 border border-red-500 rounded">
          {formik.errors.email}
        </div>
      ) : null}
    </div>

    <div className="mb-5">
      <label
        htmlFor="newPassword"
        className="block mb-2 text-sm font-medium text-emerald-900"
      >
        New Password:
      </label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-sm bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
        placeholder="Enter new password"
      />
      {formik.errors.newPassword && formik.touched.newPassword ? (
        <div className="text-red-500 mt-2 p-2 border border-red-500 rounded">
          {formik.errors.newPassword}
        </div>
      ) : null}
    </div>

    <button
      disabled={!(formik.isValid && formik.dirty)}
      type="submit"
      className="bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white "
    >
      Reset Password
    </button>
  </form>
</div>

    
  );
}

