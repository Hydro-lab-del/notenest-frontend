import api from "../utils/api";
import toast from 'react-hot-toast';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = () => {

  const navigate = useNavigate();
  const { loginSuccess, status } = useContext(AuthContext);
  const [state, setState] = useState("Login");


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {

    if (status === "INIT") return;

    if (status === "AUTH_VERIFIED") {
      navigate('/');
    }

    if (status === "AUTH_UNVERIFIED") {
      navigate("/verify-notice");
    }
  }, [status, navigate])


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let response;

      if (state === "Login") {
        response = await api.post(
          "/auth/login",
          { email, password }
        );
        toast.success("Welcome back!");
        loginSuccess(response.data.data);

      } else {
        response = await api.post(
          "/auth/register",
          { name, email, password }
        );

        const { id, email: returnedEmail } = response.data.data.user;

        toast.success("Account created! Please verify your email.");
        navigate("/verify-notice", {
          state: { userId: id, email: returnedEmail }
        });
      }

      // Reset only on success
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 403 && message?.includes("verify")) {
        toast.error(message);
      } else if (status === 400) {
        toast.error("Invalid request. Please check your input.");
      } else if (status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };


  if (status === "INIT") {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className="w-full h-screen dotted-bg flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center mb-6 ">
          <Logo />

        </div>

        <div className="flex gap-2 p-1.5 bg-gray-200 rounded-full mb-6 relative">
          {/* Sliding pill */}
          <div
            className={`absolute top-1 left-1 w-[calc(51%-0.5rem)] h-[calc(100%-0.5rem)] rounded-full bg-black transition-transform duration-500 ease-in-out ${state === "Sign Up" ? "translate-x-full" : "translate-x-0"
              }`}
          ></div>

          {/* Buttons */}
          <button
            onClick={() => setState("Login")}
            className={`w-1/2 py-2 rounded-full font-semibold relative z-10 transition-colors duration-300 ${state === "Login" ? "text-white" : "text-gray-500"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setState("Sign Up")}
            className={`w-1/2 py-2 rounded-full font-semibold relative z-10 transition-colors duration-300 ${state === "Sign Up" ? "text-white" : "text-gray-500"
              }`}
          >
            Sign Up
          </button>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="space-y-4 transition-all duration-500 ease-in-out"
        >
          {state === "Sign Up" && (
            <div className="transition-all duration-500 ease-in-out">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="username"
                placeholder="Username"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none placeholder-gray-400 "
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 pr-10 rounded border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {state === "Login" && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-blue-600 hover:text-red-500 hover:underline transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-full w-full font-bold hover:bg-gray-800 transition active:scale-95"
          >
            {loading ? "Please wait..." : state}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
