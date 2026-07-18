import React, { useState } from 'react';

export default function EmptyTrashInline({ onEmpty }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEmpty = (e) => {
    e.stopPropagation();


    setIsAnimating(true);
    onEmpty?.();

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleEmpty}
      disabled={isAnimating}
      title="Empty Trash"
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:bg-transparent rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center border border-transparent hover:border-red-100 group"
    >
      <svg
        className={`overflow-visible ${isAnimating ? 'animate-bin-shake' : ''}`}
        width="24"
        height="24"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        {/* LAYER 1: The Dropping Papers */}
        <g className={`origin-center ${isAnimating ? 'animate-paper-drop' : 'opacity-0'}`}>
          <rect x="20" y="14" width="8" height="10" rx="1.5" fill="currentColor" opacity="0.5" transform="rotate(15 20 14)" />
          <rect x="36" y="10" width="7" height="9" rx="1.5" fill="currentColor" opacity="0.4" transform="rotate(-10 36 10)" />
        </g>

        {/* LAYER 2: Solid Can Background */}
        <path 
          d="M12 18 L52 18 L47 58 C47 59.5 45.5 61 43 61 L21 61 C18.5 61 17 59.5 17 58 Z" 
          className="fill-white group-hover:fill-red-50 transition-colors duration-200"
        />

        {/* LAYER 3: The Can Stroke Outline & Ridges */}
        <path 
          d="M12 18 L52 18 L47 58 C47 59.5 45.5 61 43 61 L21 61 C18.5 61 17 59.5 17 58 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinejoin="round" />
        <line x1="24" y1="24" x2="24" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <line x1="32" y1="24" x2="32" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <line x1="40" y1="24" x2="40" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

        {/* LAYER 4: Lid Assembly */}
        <g className={`lid-group ${isAnimating ? 'animate-lid-flip' : ''}`}>
          <rect x="6" y="10" width="52" height="5" rx="2" fill="currentColor" />
          <path d="M22 10 L25 4 L39 4 L42 10 Z" fill="currentColor" />
        </g>
      </svg>

      {/* FIXED: Standard React style delivery injection instead of NextJS <style jsx> */}
      <style dangerouslySetInnerHTML={{ __html: `
        .lid-group {
          transform-origin: 54px 12px;
          transition: transform 0.3s ease;
        }

        @keyframes lidFlip {
          0%   { transform: rotate(0deg) translate(0, 0); }
          20%  { transform: rotate(60deg) translate(2px, -6px); } 
          70%  { transform: rotate(60deg) translate(2px, -5px); }
          85%  { transform: rotate(-4deg); }
          100% { transform: rotate(0deg) translate(0, 0); }
        }

        @keyframes paperDrop {
          0%   { transform: translateY(-40px) scale(1) rotate(-15deg); opacity: 0; }
          20%  { transform: translateY(-30px) scale(1) rotate(-10deg); opacity: 1; }
          55%  { transform: translateY(15px) scale(0.6) rotate(5deg); opacity: 0.8; }
          75%  { transform: translateY(30px) scale(0.2) rotate(15deg); opacity: 0; }
          100% { transform: translateY(30px) scale(0); opacity: 0; }
        }

        @keyframes binShake {
          0%, 100% { transform: rotate(0deg); }
          20%, 60% { transform: rotate(-2.5deg) translateX(-0.5px); }
          40%, 80% { transform: rotate(2.5deg) translateX(0.5px); }
        }

        .animate-lid-flip {
          animation: lidFlip 1000ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .animate-paper-drop {
          animation: paperDrop 1000ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .animate-bin-shake {
          animation: binShake 400ms ease-in-out 2;
        }
      `}} />
    </button>
  );
}