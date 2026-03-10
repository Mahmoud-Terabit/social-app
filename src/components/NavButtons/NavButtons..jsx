import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavButtons() {
  const tabs = [
    {
      id: 'feed',
      label: 'Feed',
      path: '/',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      path: '/notifications',
      badge: 3,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-full items-center justify-center">
      <nav className="flex items-center p-1 bg-white border border-[#edf2f7] rounded-full shadow-sm">
        {tabs.map(function(tab) {
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={function({ isActive }) {
                const baseClasses = "relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 no-underline font-semibold text-[14px]";
                const activeClasses = "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#1d4ed8]";
                const inactiveClasses = "text-[#4b5563] hover:bg-gray-50";
                
                return baseClasses + " " + (isActive ? activeClasses : inactiveClasses);
              }}
            >
              <span className="flex items-center justify-center">
                {tab.icon}
              </span>

              <span>{tab.label}</span>

              {tab.badge && (
                <span className="absolute -top-1 left-6 w-4 h-4 bg-[#ef4444] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {tab.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

