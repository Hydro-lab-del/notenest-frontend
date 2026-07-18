import React from 'react';

export default function NoteMenuPanel({
  width = "w-36",
  height = "h-fit",
  position = "absolute top-full right-0 mt-1", // Stays relative to the button
  children,
  onClose,
}) {
  return (
    <>
      {/* Transparent Overlay: 
         We use 'fixed inset-0' so that clicking ANYWHERE 
         on the screen (even outside the note) closes this specific menu.
      */}
      <div 
        className="fixed inset-0 z-30 bg-transparent" 
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering note click events
          onClose();
        }} 
      />

      {/* The Menu: 
         Since this is NOT a portal, 'absolute' will now 
         correctly look at your <div className='relative'> parent.
      */}
      <div
        className={`${position} ${width} ${height}
                    bg-white rounded-lg shadow-xl border border-gray-100
                    py-1 z-40 overflow-hidden transform transition-all
                    duration-200 ease-out animate-in fade-in zoom-in-95`}
      >
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </>
  );
}