"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import Link from "next/link";
import { useEffect } from "react";

const LoginPage = () => {
  const loginSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .matches(/^[a-zA-Z]/, "Username must start with a English letter")
      .matches(
        /^[a-zA-Z0-9_\-\.]+$/,
        "Username can only contain letters, numbers, underscores, hyphens, and dots"
      )
      .matches(/^\S*$/, "Username must not contain spaces"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
        "Password can only contain English letters, numbers, and special characters"
      ),
  });

  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (auth.user) {
      router.push("/dashboard");
    }
  }, [auth.user, router]);

  if (auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const onSubmit = (data) => {
    if (typeof auth.login === "function") {
      auth.login({ username: data.username });
      router.push("/dashboard");
    } else {
      console.error("login is not a function:", auth);
      localStorage.setItem("user", JSON.stringify({ username: data.username }));
      router.push("/dashboard");
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-500 to-indigo-500 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className=" p-6 text-center border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-70">Admin Login</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  {errors.username.message}
                  <span className="ml-1">⚠️</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="Password"
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  {errors.password.message}
                  <span className="ml-1">⚠️</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="ml-2">Loading...</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
