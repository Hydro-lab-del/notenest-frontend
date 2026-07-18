import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-[80%] px-4 pt-35 pb-12 overflow-hidden md:flex-row md:justify-between md:items-center md:pt-48 max-w-7xl mx-auto">
      {/* Text Content */}
      <div className="flex flex-col items-start max-w-xl z-10 md:mr-10">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] md:text-6xl lg:text-7xl animate-fade-in-up">
          Capture Your <br />
          Thoughts
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-md animate-fade-in-up">
          Seamlessly organize your ideas with our intuitive note-taking
          platform.
        </p>
        {/* Getting started Btn */}
        <button className="mt-10 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-[0_10px_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_15px_25px_-5px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
          <Link to="/auth">Get Started</Link>
        </button>
      </div>

      {/* Hero Image / Glass Elements */}
            <div className="relative mt-16 w-full max-w-xs sm:max-w-sm md:mt-0 md:max-w-md lg:max-w-lg perspective-1000">
                {/* Abstract shapes/blobs for background glow */}
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 bg-blue-400/30 rounded-full blur-[80px] -z-10 mix-blend-multiply animate-blob"></div> */}
               

                {/* Start of Glass Stack */}
                <div className="relative w-full aspect-square flex items-center justify-center">

                    {/* Back Card (Bottom) */}
                    <div className="absolute w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl transform rotate-[-15deg] -translate-x-5 translate-y-5 flex flex-col p-4 opacity-60 animate-float-delayed">
                        <div className="w-full h-2 bg-white/30 rounded-full mb-4"></div>
                        <div className="w-2/3 h-2 bg-white/30 rounded-full mb-8"></div>
                    </div>

                    {/* Middle Card */}
                    <div className="absolute w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl transform rotate-[-5deg] -translate-x-2.5 translate-y-2.5 flex flex-col p-6 z-10 animate-float">
                        {/* Icon placeholder */}
                        <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 mb-6 shadow-lg rotate-3 animate-spin-slow"></div>
                        <div className="space-y-3">
                            <div className="w-full h-2 bg-gray-500/10 rounded-full"></div>
                            <div className="w-3/4 h-2 bg-gray-500/10 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-gray-500/10 rounded-full"></div>
                        </div>
                        <div className="mt-8 flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100/50"></div>
                            <div className="w-8 h-8 rounded-full bg-cyan-100/50"></div>
                        </div>
                    </div>

                    {/* Front Card (Top) */}
                    <div className="absolute w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform rotate-10 translate-x-7.5 -translate-y-5 flex flex-col p-6 z-20 overflow-hidden hover:scale-105 transition-transform duration-500 ease-out">
                        {/* Glossy sheen */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

                        <div className="flex items-start justify-between mb-8">
                            <div className="w-12 h-12 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-tr from-indigo-300 to-purple-300 shadow-inner flex items-center justify-center animate-spin-slow">
                                <div className="w-8 h-1 bg-white/50 rounded-full"></div>
                            </div>
                            <div className="w-20 h-2 bg-gray-800/20 rounded-full transform -rotate-45 origin-top-right animate-pulse"></div> {/* Pen placeholder */}
                        </div>

                        <div className="space-y-4">
                            <div className="h-2 w-full bg-gradient-to-r from-gray-400/30 to-gray-400/10 rounded-full"></div>
                            <div className="h-2 w-2/3 bg-gradient-to-r from-gray-400/30 to-gray-400/10 rounded-full"></div>
                        </div>

                        {/* Chart placeholder */}
                        <div className="mt-auto w-full h-16 bg-blue-500/10 rounded-xl p-2 flex items-end gap-1">
                            <div className="w-1/4 h-1/3 bg-blue-400/40 rounded-sm"></div>
                            <div className="w-1/4 h-2/3 bg-blue-500/40 rounded-sm"></div>
                            <div className="w-1/4 h-1/2 bg-indigo-400/40 rounded-sm"></div>
                            <div className="w-1/4 h-full bg-purple-400/40 rounded-sm"></div>
                        </div>
                    </div>

                </div>
            </div>
    </section>
  );
};

export default Hero;
