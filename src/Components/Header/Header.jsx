import { NoteContext } from '../../Context/NoteContext';
import {
    Search,
    Bell,
    Menu,
    X,
    CheckCircle2,
    Info,
    AlertTriangle,
    ShieldAlert,
    Clock
} from 'lucide-react';
import Panel from '../Panel';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const getFormattedTime = (timeStr) => {
    try {
        const date = new Date(timeStr);
        if (isNaN(date.getTime())) return timeStr;
        const distance = formatDistanceToNow(date, { addSuffix: true });
        if (distance.includes('less than a minute')) return 'Just now';
        return distance;
    } catch {
        return timeStr;
    }
};

const getNotificationIcon = (type) => {
    switch (type) {
        case 'SUCCESS':
            return (
                <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                    <CheckCircle2 className="size-4" />
                </div>
            );
        case 'WARNING':
            return (
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                    <AlertTriangle className="size-4" />
                </div>
            );
        case 'SECURITY':
            return (
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                    <ShieldAlert className="size-4" />
                </div>
            );
        case 'REMINDER':
            return (
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Clock className="size-4" />
                </div>
            );
        case 'INFO':
        default:
            return (
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Info className="size-4" />
                </div>
            );
    }
};

const Header = ({
    setIsMobileMenuOpen,
    notifications,
    unreadCount,
    showNotification,
    setShowNotification,
    handleMarkAllRead,
    deleteNotification
}) => {

    const { searchQuery, setSearchQuery } = useContext(NoteContext);
    const { user } = useContext(AuthContext);


    return (
        <header className='flex items-center justify-between backdrop-blur-xl  bg-white/80 w-full h-20 py-2 px-6 md:px-11 border-b border-gray-200 sticky top-0 z-40 transition-all'>

            {/* left */}
            <div className='flex items-center  gap-4 w-full '>

                <button
                    onClick={() => { setIsMobileMenuOpen(true) }}
                    className=' border border-gray-200 rounded md:hidden hover:bg-gray-50  text-gray-900 p-2'>
                    <Menu className='size-5 text-gray-600' />
                </button>

                <div className='relative flex items-center flex-1 bg-gray-50 max-w-2xl rounded border border-transparent  hover:bg-gray-100 focus-within:border-gray-300'>
                    <input
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        type="text"
                        className='peer bg-transparent pl-12 py-3 pr-5  w-full text-sm focus:bg-transparent outline-none transition-colors ' placeholder='Search your notes...' />
                    <Search className='peer absolute left-4 top-1/2 -translate-y-1/2 size-4  text-gray-400 peer-focus:text-blue-500' />
                </div>

            </div>

            {/* right */}
            <div className='flex items-center gap-3 md:gap-5 ml-6 '>
                {/* BELL */}

                <div className=''>

                    <button
                        onClick={() => setShowNotification(!showNotification)}
                        className='relative bg-gray-50 p-2.5 rounded-full group hover:bg-gray-100 border border-gray-200 hover:scale-105 transition-all'
                    >
                        <Bell className='size-5 text-gray-500 group-hover:text-blue-500 transition-colors' />

                        {/* Minimalist Red Dot */}
                        {unreadCount > 0 && (
                            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-sm pointer-events-none" />
                        )}
                    </button>

                </div>


                {showNotification && (
                    <Panel
                        width="w-80"
                        height="h-fit max-h-96"
                        position="absolute top-20 right-10 mt-1"
                        onClose={() => setShowNotification(false)}
                    >
                        {/* Panel Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id} 
                                        className={`group relative pl-4 pr-3 py-3 hover:bg-gray-50/80 transition-colors flex gap-3 ${
                                            !notif.isRead ? 'bg-blue-50/10' : ''
                                        }`}
                                    >
                                        {/* Unread Accent Left Bar */}
                                        {!notif.isRead && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md" />
                                        )}

                                        {/* Icon Badge container */}
                                        <div className="flex-shrink-0 mt-0.5">
                                            {getNotificationIcon(notif.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow min-w-0 pr-4">
                                            <p className={`text-sm leading-snug mb-0.5 break-words ${notif.isRead ? 'text-gray-700' : 'font-semibold text-gray-900'}`}>
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-gray-500 leading-normal break-words">{notif.message}</p>
                                            <span className="text-[10px] text-gray-400 mt-1.5 block tracking-wide">
                                                {getFormattedTime(notif.time)}
                                            </span>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notif.id);
                                            }}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded p-1 h-fit transition-all opacity-0 group-hover:opacity-100"
                                            title="Delete notification"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-gray-400 text-sm">You're all caught up! 🔔</p>
                                </div>
                            )}
                        </div>
                    </Panel>
                )}

                <div className='size-10 bg-gray-400 rounded-full text-center hover:scale-105 transition-transform cursor-pointer '>
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                        alt="Profile Avatar"
                        className="w-full h-full rounded-xl object-cover bg-white"
                    />
                </div>

            </div>

        </header>
    )
}

export default Header
