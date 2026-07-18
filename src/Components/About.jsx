import React from "react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-white/30 backdrop-blur-sm border-y border-white/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text block */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              At NoteNest, we believe that your mind should be free to create, not cluttered with trying to remember everything. 
              We designed NoteNest to be the ultimate, lightweight workspace for your thoughts, tasks, and daily reflections.
            </p>
            <p className="mt-4 text-md text-gray-500 leading-relaxed">
              Whether you are jotting down a quick idea, listing groceries, or planning your next big project, NoteNest 
              provides a seamless, distraction-free environment with intelligent reminders to ensure nothing slips through the cracks.
            </p>
            <div className="mt-8 flex gap-6">
              <div>
                <h4 className="text-3xl font-bold text-blue-600">100%</h4>
                <p className="text-sm text-gray-500 mt-1">Privacy Focused</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-cyan-500">Free</h4>
                <p className="text-sm text-gray-500 mt-1">No Premium Paywalls</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-indigo-500">24/7</h4>
                <p className="text-sm text-gray-500 mt-1">Secure Backups</p>
              </div>
            </div>
          </div>

          {/* Visual card element */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md p-8 bg-gradient-to-br from-white/70 to-white/40 border border-white/60 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why choose NoteNest?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Ultra-fast web client with React & Tailwind CSS.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Persistent database security with MongoDB Atlas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Dynamic email reminder integration via SMTP.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
