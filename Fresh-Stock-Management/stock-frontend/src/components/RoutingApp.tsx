// src/components/RoutingApp.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

// VVV [จุดแก้ไขที่ 1] - Import 2 หน้าใหม่ VVV
import KitchenList from './KitchenList';
import FridgeList from './FridgeList';

const RoutingApp: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100">

                {/* VVV [จุดแก้ไขที่ 2] - เปลี่ยนสี และ เพิ่ม 2 เมนูใหม่ VVV */}
                <nav className="bg-pink-500 p-4 shadow-md">
                    <ul className="flex space-x-6 text-white text-lg font-medium justify-center">
                        <li><Link to="/" className="hover:text-pink-200 transition-colors">Home</Link></li>
                        <li><Link to="/items/list" className="hover:text-pink-200 transition-colors">All Items</Link></li>
                        <li><Link to="/kitchen" className="hover:text-pink-200 transition-colors">🍳 Kitchen</Link></li>
                        <li><Link to="/fridge" className="hover:text-pink-200 transition-colors">🧊 Fridge</Link></li>
                        <li><Link to="/items/new" className="hover:text-pink-200 transition-colors">Add New</Link></li>
                    </ul>
                </nav>
                {/* ^^^ จบจุดแก้ไข ^^^ */}


                <div className="max-w-6xl mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/items/list" element={<ItemList />} />

                        {/* VVV [จุดแก้ไขที่ 3] - เพิ่ม 2 Route ใหม่ VVV */}
                        <Route path="/kitchen" element={<KitchenList />} />
                        <Route path="/fridge" element={<FridgeList />} />

                        <Route path="/items/new" element={<ItemForm />} />
                    </Routes>
                </div>

            </div>
        </BrowserRouter>
    );
};

export default RoutingApp;