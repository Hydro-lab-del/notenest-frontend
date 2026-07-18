import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className="flex items-center justify-between w-full max-w-6xl h-16 px-6 mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-md font-medium text-gray-600 hover:text-blue-600 hover:scale-105 transition-all duration-300"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-md font-medium text-gray-600 hover:text-blue-600 hover:scale-105 transition-all duration-300"
          >
            About
          </a>
        </div>

        {/* Login Button */}
        <div>
          <button className="px-5 py-2 text-md font-medium text-gray-700 bg-transparent border border-gray-300 rounded-full hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer">
            <Link to="/auth">Login</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
