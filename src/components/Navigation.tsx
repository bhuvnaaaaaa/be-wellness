import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Radiation as Meditation, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/meditations', icon: Meditation, label: 'Meditations' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full p-4 z-50">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_0_20px_rgba(167,139,250,0.2)] p-2">
        <div className="flex justify-around items-center">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                className={`relative p-3 rounded-xl transition-colors ${
                  isActive ? 'text-purple-300' : 'text-purple-200/70 hover:text-purple-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="navBackground"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1 block font-body tracking-wide">{label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;