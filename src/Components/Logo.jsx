import React, { useId } from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", hideText = false }) => {
    const uniqueId = useId().replace(/:/g, ''); // Remove colons just in case for older CSS selectors

    const leftGradientId = `logo_left_${uniqueId}`;
    const rightGradientId = `logo_right_${uniqueId}`;
    const diagonalGradientId = `logo_diag_${uniqueId}`;

    return (
        <Link to="/welcome" className={`flex items-center gap-2 ${className}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 min-w-8 min-h-8 shrink-0">
                <defs>
                    <linearGradient id={leftGradientId} x1="10" y1="3" x2="10" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22d3ee" /> {/* Cyan-400 */}
                        <stop offset="1" stopColor="#3b82f6" /> {/* Blue-500 */}
                    </linearGradient>
                    <linearGradient id={rightGradientId} x1="22" y1="3" x2="22" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a855f7" /> {/* Purple-500 */}
                        <stop offset="1" stopColor="#6366f1" /> {/* Indigo-500 */}
                    </linearGradient>
                    <linearGradient id={diagonalGradientId} x1="10" y1="3" x2="22" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60a5fa" /> {/* Lighter Blue */}
                        <stop offset="1" stopColor="#c084fc" /> {/* Lighter Purple */}
                    </linearGradient>
                </defs>

                {/* Left vertical pill - Cyan/Blue */}
                <path d="M7 6C7 4.34315 8.34315 3 10 3V3C11.6569 3 13 4.34315 13 6V26C13 27.6569 11.6569 29 10 29V29C8.34315 29 7 27.6569 7 26V6Z" fill={`url(#${leftGradientId})`} />

                {/* Diagonal and Right vertical - Purple/Indigo */}
                <path d="M19 6C19 4.34315 20.3431 3 22 3V3C23.6569 3 25 4.34315 25 6V26C25 27.6569 23.6569 29 22 29V29C20.3431 29 19 27.6569 19 26V6Z" fill={`url(#${rightGradientId})`} />

                {/* Diagonal connecting overlay */}
                <path d="M13 6C13 4.34315 11.6569 3 10 3C10.7403 3 11.4177 3.27239 11.9575 3.72793L23.0425 28.2721C22.5027 28.7276 21.8253 29 21.085 29C19.4281 29 18.085 27.6569 18.085 26V26V16.5L13 6Z" fill={`url(#${diagonalGradientId})`} />
            </svg>
            {!hideText && <span className="text-xl font-bold text-gray-900 tracking-tight">NoteNest</span>}
        </Link>
    );
};

export default Logo;
