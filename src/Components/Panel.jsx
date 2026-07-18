import { createPortal } from 'react-dom';

export default function Panel({
  width = "w-72",
  height = "h-60",
  position = "absolute right-4 mt-2", 
  children,
  onClose,
}) {
  // This creates the actual UI
  const panelContent = (
    <>
      {/* Overlay - now truly fullscreen because it's in a Portal */}
      <div 
        className="fixed inset-0 z-998 bg-black/0" 
        onClick={onClose} 
      />

      {/* Panel - positioned relative to where you call it */}
      <div
        className={`${position} ${width} ${height}
                    bg-white rounded-xl shadow-xl border border-gray-100
                    py-1 z-999 overflow-hidden transform transition-all
                    duration-300 ease-out animate-slideDown`}
      >
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </>
  );

  // Teleport it to the document body
  return createPortal(panelContent, document.body);
}