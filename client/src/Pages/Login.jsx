import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (state === "Sign Up" && !name) {
      toast.error("Please enter your full name");
      return;
    }

    try {
      if (state === "Sign Up") {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          name,
          email,
          password,
        });

        toast.success(res.data.message || "Account created successfully!");
        setState("Login");
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        toast.success(res.data.message || "Login successful!");
        navigate("/");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-white">
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="absolute left-5 sm:left-20 top-5 w-48 sm:w-64 cursor-pointer"
        />

        <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-orange-300 text-sm">
          <h2 className="text-center text-3xl font-semibold text-white mb-3">
            {state === "Sign Up" ? "Create Account" : "Login Account"}
          </h2>

          <p className="text-center text-sm mb-6">
            {state === "Sign Up"
              ? "Create your account below"
              : "Login to your account"}
          </p>

          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="Person" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="outline-none bg-transparent w-full"
                />
              </div>
            )}

            <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="Email" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="outline-none bg-transparent w-full"
              />
            </div>

            <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="Lock" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="outline-none bg-transparent w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-tr from-orange-400 to-red-400 hover:from-orange-400 hover:to-red-300 text-white py-2.5 rounded-full font-semibold transition-all mb-4 cursor-pointer"
            >
              {state}
            </button>
          </form>

          {state === "Sign Up" ? (
            <p className="text-gray-400 text-center text-xs mt-2">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-orange-400 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-2">
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-orange-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
