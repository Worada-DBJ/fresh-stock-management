// src/App.tsx
import React from 'react';
import RoutingApp from './components/RoutingApp'; // << 1. Import ตัวจัดการเมนู

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 p-4">
        Stock Management App
      </h1>
      <RoutingApp /> {/* 2. เรียกใช้ตัวจัดการเมนู */}
    </div>
  );
};

export default App;