import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    login,
    user,
  } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  if (user) {
    return (
      <Navigate
        to="/owner"
        replace
      />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !form.email.trim() ||
      !form.password
    ) {
      setError(
        "Email and password are required."
      );

      return;
    }

    try {
      setSubmitting(true);

      await login(
        form.email,
        form.password
      );

      navigate("/owner");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Northline Roofing & Exteriors
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Owner Portal
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to manage your estimator.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    email:
                      event.target.value,
                  }))
                }
                placeholder="owner@northline.local"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    password:
                      event.target.value,
                  }))
                }
                placeholder="Enter password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Signing in..."
              : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-5 w-full text-center text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to estimator
        </button>
      </div>
    </div>
  );
};

export default Login;