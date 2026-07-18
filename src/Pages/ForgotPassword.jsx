import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import AnimatedBackground from "../Components/AnimatedBackground";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md p-8 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl text-left font-bold mb-4">Reset Password</h2>
    

        <form onSubmit={handleSubmit} className="">
          <label htmlFor="email"
          className="block mb-2 text-gray-600 text-left ">Enter your NoteNest Account email.</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-6 px-3 py-2 rounded border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Next"}
          </button>
        </form>

        <Link to="/auth" className="block mt-4 text-sm text-blue-600 hover:underline">
          Return to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;