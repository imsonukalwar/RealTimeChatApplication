
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { userName, email, password },
        { withCredentials: true }
      );

      // dispatch(setUserData(res.data));
      dispatch(setUserData(res.data.user));
      toast.success("Registration successful 🎉");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

      setLoading(false);
    } catch (error) {
      setErr(
        error?.response?.data?.message ||
          "Signup failed, please try again"
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#eef6ff] via-[#f7fbff] to-[#e6f7ff] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-[480px] bg-white/70 backdrop-blur-xl rounded-[30px] shadow-[0_30px_90px_rgba(0,0,0,0.15)] p-8">

        {/* BRAND */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[70px] h-[70px] rounded-2xl bg-gradient-to-tr from-[#1d7fff] to-[#19d3ff] flex items-center justify-center shadow-lg text-white text-3xl font-bold">
            C
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">
            Join Chatter and start chatting
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5"
        >
          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            className="w-full h-[54px] px-4 rounded-xl border border-gray-200 focus:border-[#1d7fff] outline-none shadow-sm focus:shadow-md transition"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full h-[54px] px-4 rounded-xl border border-gray-200 focus:border-[#1d7fff] outline-none shadow-sm focus:shadow-md transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[54px] px-4 rounded-xl border border-gray-200 focus:border-[#1d7fff] outline-none shadow-sm focus:shadow-md transition"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
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
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* LINK */}
          <p className="text-center text-gray-600 text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-[#1d7fff] font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;