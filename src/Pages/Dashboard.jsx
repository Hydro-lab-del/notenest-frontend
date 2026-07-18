import { useContext, useState } from "react";
import './dashboard.css';
import { NotebookPen } from 'lucide-react';
import MobileSidebar from '../Components/SideBar/MobileSidebar';
import NoteModal from '../Components/Note/NoteModal';
import Sidebar from '../Components/SideBar/Sidebar';
import Header from '../Components/Header/Header';
import { NoteContext } from '../Context/NoteContext';
import { NotificationContext } from '../Context/NotificationContext';
import { Outlet } from 'react-router-dom';




const Dashboard = () => {

  const { setEditingNote, isModalOpen, setIsModalOpen, openNoteModal,view } = useContext(NoteContext);
  const {
    notifications,
    unreadCount,
    showNotification,
    setShowNotification,
    deleteNotification,
    handleMarkAllRead
  } = useContext(NotificationContext);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  return (
    <div className='flex h-screen overflow-hidden font-sans '>

      <Sidebar />


      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}

      />

      <main className='flex flex-1 flex-col  w-full '>

        <Header
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onMenuClick={() => setIsMobileMenuOpen(true)}
          notifications={notifications}
          unreadCount={unreadCount}
          showNotification={showNotification}
          setShowNotification={setShowNotification}
          handleMarkAllRead={handleMarkAllRead}
          deleteNotification={deleteNotification}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar  scroll-smooth">
          <Outlet />
        </div>

        {/* Floating Action Button */}
        {(view !== 'trash' && view !== 'profile') &&(

        <button
          onClick={openNoteModal}
          className='fixed bottom-8 right-8  size-12 flex items-center justify-center bg-black rounded-full hover:-translate-y-1 active:scale-95 '>
          <NotebookPen className="text-gray-50" />
        </button>
        )}

      </main>

      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingNote(null) }}
        />
      )}
    </div>
  )

}
export default Dashboard

