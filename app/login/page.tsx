"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { tr } from "date-fns/locale";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        if (data.error === "Invalid credentials") {
          formik.setFieldError("email", " ");
          formik.setFieldError("password", "Invalid email or password");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white text-blue-900 flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <a href="#" className="mb-4">
        <div className="text-blue-900 font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
            />
          </svg>
          MAXPO CMS
        </div>
      </a>

      <div className="relative mt-12 w-full max-w-md sm:mt-10 px-4">
        <div className="rounded-xl border border-gray-200 shadow-md p-6 bg-white">
          <h3 className="text-xl font-semibold tracking-tight mb-2">Login</h3>
          <p className="text-sm text-gray-600 mb-4">
            Welcome back, enter your credentials to continue.
          </p>

          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field with Toggle */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full border rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            {/* <div className="flex justify-between items-center mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  className="accent-blue-500"
                />
                Remember me
              </label>
            </div> */}

            {/* Button */}
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
