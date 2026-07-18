// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const VerifyNotice = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { userId, email } = location.state || {}; // Grab from navigation state

//     useEffect(() => {
//         if (!userId) return; // Guard clause if someone tries to visit page directly

//         const interval = setInterval(async () => {
//             try {
//                 // Use the ID to check status
//                 const res = await axios.get(`http://localhost:5000/auth/status/${userId}`);

//                 if (res.data.isVerified) {
//                     clearInterval(interval);
//                     // Navigate to login with success message
//                     navigate("/auth", { state: { verified: true } });
//                 }
//             } catch (err) {
//                 console.error("Polling error:", err);
//             }
//         }, 3000); // Check every 3 seconds

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, [userId, navigate]);

//     return (
//         <div >
//             <h2>Verify your Email</h2>
//             <p>We've sent a link to <strong>{email}</strong>.</p>
//             <p>This page will automatically update once you click the link in your email.</p>
//         </div>
//     );
// };


// export default VerifyNotice
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import AnimatedBackground from "../Components/AnimatedBackground";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const VerifyNotice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = location.state?.userId || user?.id || user?._id;
  const email = location.state?.email || user?.email;

  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(async () => {
      try {
        // Use the ID to check status
        const res = await api.get(`/auth/status/${userId}`);

        if (res.data.isVerified) {
          clearInterval(interval);
          // Navigate to login with success message
          navigate("/auth", { state: { verified: true } });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 7000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [userId, navigate]);

  // cooldown 
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1)
      }, 1000);
      return () => {
        clearTimeout(timer);
      }
    }

  }, [cooldown])

  const handleResend = async () => {
    try {
      setResendLoading(true);

      await api.post("/auth/resend-verification",
        {
          userId
        });

        toast.success("A fresh link has been sent to your inbox!"); // Beautiful!
      setCooldown(60);
    
    } catch (err) {
     const msg = err.response?.data?.message || "Failed to resend email";
    toast.error(msg);

    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="relative  w-full h-screen flex items-center justify-center font-sans overflow-hidden">
      {/*  Animated background */}
      <AnimatedBackground />

      {/*  Foreground card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"></div>

        <div className="relative text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Verify your Email
          </h2>
          <p className="text-gray-700">
            We've sent a link to <br /> <strong className="text-gray-900">{email}</strong>.
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 py-2 px-4 bg-white/40 rounded-full border border-white/60">
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-md text-gray-500">Waiting for verification</p>
            </div>

            {/* <p className="text-sm text-gray-500">
              This page will automatically.
            </p> */}
          </div>


          <div className="pt-4 border-t border-white/40 space-y-4">
            <p className="text-sm text-gray-600">Didn't receive the email?</p>

            <button
            onClick={handleResend}
            disabled={resendLoading || cooldown > 0}
            className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm 
            ${cooldown > 0 || resendLoading
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 active:scale-95"
            }`}>
              {resendLoading ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Email"}
            </button>

          </div>

          <div>

          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors font-semibold hover:underline underline-offset-4"
          >
            Go back to homepage
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyNotice;