// src/components/About.tsx

import React from 'react';
// 1. [ใหม่!] Import โลโก้เทคโนโลยีจาก react-icons
import { FaReact } from 'react-icons/fa';
import {
    SiNestjs,
    SiMysql,
    SiTailwindcss,
    SiTypescript,
    SiVite
} from 'react-icons/si';

const About: React.FC = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">
                About This Project
            </h1>

            {/* 2. [ใหม่!] เพิ่มคำอธิบายโปรเจกต์ */}
            <p className="text-lg text-gray-700 text-center mb-6">
                This is a **Stock Management System** created for the final project.
                It demonstrates a full-stack application using modern web technologies.
            </p>

            {/* 3. [ใหม่!] ใส่ชื่อผู้พัฒนา (เปลี่ยนเป็นชื่อ/รหัสของคุณ) */}
            <div className="text-center mb-8">
                <p className="text-xl font-semibold text-purple-700">Created By</p>
                <p className="text-lg text-gray-600">[ใส่ชื่อ-นามสกุล หรือ รหัสนักศึกษาของคุณ]</p>
            </div>

            {/* 4. [ใหม่!] ส่วนแสดง Tech Stack พร้อมโลโก้ */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
                    Technology Used
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    {/* สร้าง "การ์ด" สำหรับแต่ละโลโก้ */}
                    <TechCard icon={<FaReact className="text-blue-500" />} name="React.js" />
                    <TechCard icon={<SiNestjs className="text-red-600" />} name="Nest.js" />
                    <TechCard icon={<SiTypescript className="text-blue-600" />} name="TypeScript" />
                    <TechCard icon={<SiTailwindcss className="text-cyan-500" />} name="Tailwind CSS" />
                    <TechCard icon={<SiMysql className="text-blue-700" />} name="MySQL" />
                    <TechCard icon={<SiVite className="text-purple-500" />} name="Vite" />

                </div>
            </div>

        </div>
    );
};

// 5. [ใหม่!] สร้างคอมโพเนนต์ย่อยสำหรับ "การ์ดโลโก้"
const TechCard: React.FC<{ icon: React.ReactNode, name: string }> = ({ icon, name }) => (
    <div className="bg-pink-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center
                  hover:shadow-lg hover:bg-pink-100 transition-all">
        <div className="text-5xl mb-2">{icon}</div>
        <p className="text-md font-semibold text-pink-800">{name}</p>
    </div>
);

export default About;