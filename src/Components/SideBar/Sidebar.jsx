import { memo, useState, useContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

import Logo from '../Logo';
import NavItem from '../NavItem';

import {
  Home,
  Settings,
  User,
  Heart,
  LogOut,
  Trash2,
  Clock
} from 'lucide-react';

const Sidebar = memo(() => {
    const { logout } = useContext(AuthContext);
  

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  }, [logout, navigate]);

  return (
    <aside
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
      className={`hidden md:flex flex-col h-screen backdrop-blur-xl  bg-white/80 border-r border-gray-100 z-50 sticky top-0 shadow-sm transition-all duration-300 ease-in-out ${isSidebarHovered ? "w-65" : "w-20"}
            `}
    >

      <div className={`p-2 flex justify-center mb-12 mt-4 items-center transition-all duration-300 pb-5.5   ${isSidebarHovered ? "px-14" : "px-5 "}`}>
        <Logo hideText={!isSidebarHovered} />
      </div>

      <div className='flex  items-center flex-col justify-between h-full px-3'>

        <nav className='flex flex-col gap-2 w-full'>

          {/* Example usage of NavItem */}
          <NavItem
            icon={Home}
            label="Notes"
            to="/" 
            isSidebarHovered={isSidebarHovered}
            
          />
          <NavItem
            icon={Heart}
            label="Favorite"
            to='/favorites'
            isSidebarHovered={isSidebarHovered}

          />
          <NavItem
            icon={Clock}
            label="Reminders"
            to='/reminders'
            isSidebarHovered={isSidebarHovered}
          />
          <NavItem
            icon={User}
            label="Profile"
            to='/profile'
            isSidebarHovered={isSidebarHovered}
          />
          <NavItem
            icon={Trash2}
            label="Trash"
            to="/trash"
            isSidebarHovered={isSidebarHovered}
          />


        </nav>

        <div className='pb-6 w-full'>
          <NavItem
            icon={LogOut}
            label="Logout"
            isSidebarHovered={isSidebarHovered}
            onClick={handleLogout}
            logout
          />
        </div>
      </div>

    </aside>
  )
})

export default Sidebar
