import {useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';



const Avatar = () => {
    const { user } = useContext(AuthContext);
  return (
    <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
            <div className="relative size-24 md:size-28 bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 hover:scale-105 transition-transform duration-300">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                alt="Profile Avatar"
                className="w-full h-full rounded-xl object-cover bg-white"
              />
            </div>
    </div>
  )
}

export default Avatar
