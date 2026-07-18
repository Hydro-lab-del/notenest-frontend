import AnimatedBackground from "./AnimatedBackground";
import Logo from "./Logo"; // Use your actual Logo

const PageLoader = () => (
  <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
    <AnimatedBackground />
    <div className="relative z-10 flex flex-col items-center">
      {/* Your Logo with a soft pulse */}
      <div className="animate-pulse scale-110">
         <div className='flex items-center gap-2 '>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8.5 h-8.5">
                {/* Left vertical pill - Cyan/Blue */}
                <path d="M7 6C7 4.34315 8.34315 3 10 3V3C11.6569 3 13 4.34315 13 6V26C13 27.6569 11.6569 29 10 29V29C8.34315 29 7 27.6569 7 26V6Z" fill="url(#left_gradient)" />

                {/* Diagonal and Right vertical - Purple/Indigo 
            The diagonal starts from the top-left of the implied N box and goes to bottom-right, 
            then goes up.
            To match the image: 
            - Left part is distinct.
            - Right part (Vertical) + Diagonal connects. 
            - The provided image has a smooth connection.
        */}
                <path d="M19 6C19 4.34315 20.3431 3 22 3V3C23.6569 3 25 4.34315 25 6V26C25 27.6569 23.6569 29 22 29V29C20.3431 29 19 27.6569 19 26V6Z" fill="url(#right_gradient)" />

                {/* Diagonal connecting overlay */}
                <path d="M13 6C13 4.34315 11.6569 3 10 3C10.7403 3 11.4177 3.27239 11.9575 3.72793L23.0425 28.2721C22.5027 28.7276 21.8253 29 21.085 29C19.4281 29 18.085 27.6569 18.085 26V26V16.5L13 6Z" fill="url(#diagonal_gradient)" />

                <defs>
                    <linearGradient id="left_gradient" x1="10" y1="3" x2="10" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22d3ee" /> {/* Cyan-400 */}
                        <stop offset="1" stopColor="#3b82f6" /> {/* Blue-500 */}
                    </linearGradient>
                    <linearGradient id="right_gradient" x1="22" y1="3" x2="22" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a855f7" /> {/* Purple-500 */}
                        <stop offset="1" stopColor="#6366f1" /> {/* Indigo-500 */}
                    </linearGradient>
                    {/* Diagonal gradient blending the two - Made more distinct */}
                    <linearGradient id="diagonal_gradient" x1="10" y1="3" x2="22" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60a5fa" /> {/* Lighter Blue */}
                        <stop offset="1" stopColor="#c084fc" /> {/* Lighter Purple */}
                    </linearGradient>
                </defs>
            </svg>

        <span className="text-2xl font-bold text-gray-900 tracking-tight"> NoteNest</span>
    </div>
      </div>
      {/* No text here makes the transition feel instant and premium */}
    </div>
  </div>
);

export default PageLoader;