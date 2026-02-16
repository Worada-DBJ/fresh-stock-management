// src/components/Home.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { selectItems, type Item } from '../store/itemsSlice';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaExclamationTriangle, FaPlusCircle } from 'react-icons/fa';

// 2. [ใหม่!] ฟังก์ชันที่ "ปลอดภัย" สำหรับนับของใกล้หมดอายุ
const getExpiringSoonCount = (items: Item[]): number => {
    // --- [เพิ่มเกราะป้องกันที่ 1] ---
    // ถ้า items ไม่ใช่ array (เช่น ยังโหลดไม่เสร็จ) ให้คืนค่า 0 ทันที
    if (!Array.isArray(items)) {
        return 0;
    }

    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    let count = 0;
    items.forEach(item => {
        try {
            // --- [เพิ่มเกราะป้องกันที่ 2] ---
            // ถ้าไม่มีวันที่ หรือวันที่ 'null' ให้ข้ามไป
            if (!item.expiry_date) return;

            const expiryDate = new Date(item.expiry_date);

            // --- [เพิ่มเกราะป้องกันที่ 3] ---
            // ถ้าวันที่ผิด format (Invalid Date) ให้ข้ามไป
            if (isNaN(expiryDate.getTime())) return;

            if (expiryDate >= today && expiryDate <= sevenDaysFromNow) {
                count++;
            }
        } catch (error) {
            // ถ้ามี Error อื่นๆ ให้ข้ามไป (จะได้ไม่พัง)
            console.error("Error processing date for item:", item, error);
        }
    });
    return count;
};

const Home: React.FC = () => {
    const items = useSelector(selectItems);

    // --- [เพิ่มเกราะป้องกันที่ 4] ---
    // ตรวจสอบก่อนส่งไปคำนวณ
    const totalItems = Array.isArray(items) ? items.length : 0;
    const expiringSoon = getExpiringSoonCount(items);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">
                Welcome to your Stock!
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* การ์ดที่ 1: ของทั้งหมด */}
                <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                    <FaBoxOpen className="text-4xl text-purple-600" />
                    <div>
                        <p className="text-lg font-semibold text-purple-800">Total Items</p>
                        <p className="text-3xl font-bold text-purple-700">{totalItems}</p>
                    </div>
                </div>

                {/* การ์ดที่ 2: ใกล้หมดอายุ */}
                <div className="bg-red-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                    <FaExclamationTriangle className="text-4xl text-red-600" />
                    <div>
                        <p className="text-lg font-semibold text-red-800">Expiring Soon</p>
                        <p className="text-3xl font-bold text-red-700">{expiringSoon}</p>
                    </div>
                </div>

                {/* การ์ดที่ 3: ปุ่มลัด "เพิ่มของ" */}
                <Link
                    to="/items/new"
                    className="bg-pink-400 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 
                     hover:bg-pink-500 transition-transform transform hover:scale-105"
                >
                    <FaPlusCircle className="text-4xl" />
                    <div>
                        <p className="text-lg font-semibold">Add New Item</p>
                        <p className="text-sm">Click here to add a new item to your stock.</p>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Home;