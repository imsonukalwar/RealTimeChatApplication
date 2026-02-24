

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { setSelectedUser, setUserData } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
    );

    if (res.data.success) {
        dispatch(setUserData(res.data.user));
        dispatch(setSelectedUser(null));
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Login failed. Try again.";

      if (msg.toLowerCase().includes("not found")) {
        setErr("Email not registered. Please signup first.");
      } else if (msg.toLowerCase().includes("password")) {
        setErr("Incorrect password. Please try again.");
      } else {
        setErr(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#eef6ff] via-[#f7fbff] to-[#e6f7ff] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-[460px] bg-white/70 backdrop-blur-xl rounded-[30px] shadow-[0_30px_90px_rgba(0,0,0,0.15)] p-8">

        {/* BRAND */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[70px] h-[70px] rounded-2xl bg-gradient-to-tr from-[#1d7fff] to-[#19d3ff] flex items-center justify-center shadow-lg text-white text-3xl font-bold">
            C
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Login to continue to Chatter
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[54px] px-4 rounded-xl border border-gray-200 focus:border-[#1d7fff] outline-none shadow-sm focus:shadow-md transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[54px] px-4 rounded-xl border border-gray-200 focus:border-[#1d7fff] outline-none shadow-sm focus:shadow-md transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-4 top-4 text-sm text-[#1d7fff] font-semibold cursor-pointer select-none"
              onClick={() => setShow((p) => !p)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {/* ERROR */}
          {err && (
            <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              ⚠️ {err}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[56px] rounded-xl bg-gradient-to-r from-[#1d7fff] to-[#19d3ff] text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* LINK */}
          <p className="text-center text-gray-600 text-sm mt-2">
            Don’t have an account?{" "}
            <span
              className="text-[#1d7fff] font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;