import AnimatedBackground from "./AnimatedBackground";

const LoadingSpinner = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden font-sans">
      <AnimatedBackground />

      {/* Glass Container */}
      <div className="relative z-10 flex flex-col items-center p-12 rounded-3xl">
        
        {/* Modern Gradient Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer Glow */}
          <div className="absolute w-20 h-20 bg-blue-400/20 blur-2xl rounded-full animate-pulse"></div>
          
          {/* The Actual Spinner */}
          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-blue-500 animate-spin shadow-inner"></div>
        </div>
        
        {/* Elegant Text */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-gray-800 font-semibold tracking-wide">
            Authenticating
          </p>
          <div className="flex justify-center gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;