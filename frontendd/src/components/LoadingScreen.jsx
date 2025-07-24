import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative">
        <img
          src="/src/assets/images/logo.png"
          alt="Logo"
          className="w-24 h-24 animate-bounce"
        />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-loading"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-loading delay-150"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-loading delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;