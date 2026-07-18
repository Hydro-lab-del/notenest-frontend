import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import AnimatedBackground from "../Components/AnimatedBackground";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        if (token) {
          // Case 1: user clicked email link
          setLoading(true);
          await api.get(`/auth/verify-email?token=${token}`);

          toast.success("Email verified successfully! You can now log in.");
          navigate("/auth");
        } else if (user?.id) {
          // Case 2: no token but we have user from context
          const res = await api.get(`/auth/status/${user.id}`);
          if (res.data.isVerified) {
            setAlreadyVerified(true);
          }
        }
      } catch {
        toast.error("Verification link expired or invalid.");
        setError("Invalid or expired link");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate, user]);

  // --- UI states ---
  let content;
  if (loading) {
    content = <p>Verifying...</p>;
  } else if (error) {
    content = (
      <div className="space-y-2">
        <p>{error}</p>
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          Go back to homepage
        </Link>
      </div>
    );
  } else if (alreadyVerified) {
    content = (
      <div className="space-y-2">
        <p>Email already verified </p>
        <Link to="/auth" className="text-sm text-blue-600 hover:underline">
          Go to login
        </Link>
      </div>
    );
  } else if (!token) {
    content = <p>Please check your email for verification link.</p>;
  } else {
    content = <p>Email verified successfully! Redirecting...</p>;
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center font-sans overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg"></div>

        <div className="relative text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Verification</h1>
          <div className="text-gray-700 font-medium">{content}</div>

          <Link
            to="/"
            className=" text-sm text-blue-600 hover:text-blue-500 transition-colors font-semibold hover:underline underline-offset-4"
          >
            Go back to homepage
          </Link>
        </div>
      </div>


    </div>
  );
};

export default VerifyEmailPage;





// The Flow: 1. User clicks "Register." 2. Frontend redirects to /verify-email-notice. 3. This page says: "We've sent a link to user@email.com. It expires in 15 minutes. Check your inbox (and spam!)." 4. Include a "Resend Email" button on this page in case the 15 minutes run out.