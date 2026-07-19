import { useContext, useCallback } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import { X, Home, Heart, User, LogOut, Trash2, Clock } from 'lucide-react';
import Logo from '../Logo';
import NavItem from '../NavItem';

const MobileSidebar = ({ isOpen, onClose, }) => {

    const { logout } = useContext(AuthContext);

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
        <div
            className={`fixed inset-0 z-60 transition-opacity duration-300 ${isOpen ? "bg-black/30 backdrop-blur-md opacity-100" : "opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
        >
            <aside
                onClick={(e) => e.stopPropagation()}
                className={`fixed inset-y-0 left-0 w-72 bg-white flex flex-col h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between py-6 px-4">
                    <Logo />
                    <button
                        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all"
                        onClick={onClose}
                    >
                        <X className="size-5 text-gray-500" />
                    </button>
                </div>

                <div className="border-b border-gray-100" />

                <div className="flex flex-col items-center justify-between h-full px-3 mt-10">
                    <nav className="flex flex-col gap-2 w-[90%]">
                        <NavItem icon={Home} label="Home" to="/"  mobile  />
                        <NavItem icon={Heart} label="Favorite" to='/favorites'  mobile />
                        <NavItem icon={Clock} label="Reminders" to='/reminders' mobile />
                        <NavItem icon={User} label="Profile"  to='/profile' mobile />
                        <NavItem icon={Trash2} label="Trash"  to="/trash" mobile />
                    </nav>


                    <div className="pb-6 w-[90%]">
                        <NavItem
                            icon={LogOut}
                            label="Logout"
                            mobile
                            onClick={handleLogout}
                            logout
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default MobileSidebar;