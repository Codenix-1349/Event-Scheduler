import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // FR016: If already authenticated, redirect away from sign-in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // FR012: Send POST /api/auth/login
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      const { token } = response.data;

      // FR013: Store token and update state
      login(token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 animate-in fade-in duration-700">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-content/5">
        <div className="bg-primary h-2 w-full"></div>
        <div className="card-body p-10">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="bg-primary/10 p-4 rounded-2xl mb-4 text-primary">
              <LogIn className="w-8 h-8 font-black" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter">WELCOME BACK.</h2>
            <p className="font-medium opacity-50 mt-1">Ready for your next event?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="alert alert-error rounded-xl py-3 text-sm font-bold shadow-lg shadow-error/10">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold opacity-60 flex gap-2 items-center">
                  <Mail className="w-4 h-4" /> Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered focus:input-primary rounded-xl font-medium"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label py-0">
                  <span className="label-text font-bold opacity-60 flex gap-2 items-center">
                    <Lock className="w-4 h-4" /> Password
                  </span>
                </label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered focus:input-primary rounded-xl font-medium"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-8">
              <button
                type="submit"
                className={`btn btn-primary btn-lg rounded-2xl shadow-xl shadow-primary/20 font-black tracking-tight ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-base-content/5">
            <p className="text-sm font-medium opacity-60">
              New to the community?{" "}
              <Link to="/signup" className="text-primary font-black hover:underline uppercase tracking-tighter">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
