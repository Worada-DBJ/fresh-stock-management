// src/components/ItemForm.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import { addItem, updateItem, type Item } from '../store/itemsSlice';

// 1. นิยาม Props ที่จะรับเข้ามา
interface ItemFormProps {
    existingItem?: Item; // รับข้อมูลสินค้าเดิม (ถ้าเป็นโหมดแก้ไข)
    onCancelEdit?: () => void; // รับฟังก์ชันสำหรับยกเลิก (ถ้าเป็นโหมดแก้ไข)
}

/* คอมโพเนนต์สำหรับฟอร์ม เพิ่ม/แก้ไข */
const ItemForm: React.FC<ItemFormProps> = ({ existingItem, onCancelEdit }) => {
    const dispatch = useDispatch<AppDispatch>();

    // 2. สร้าง State ท้องถิ่นสำหรับเก็บค่าในฟอร์ม
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        category: '',
        location: '',
        production_date: '',
        expiry_date: '',
    });

    // 3. ตรวจสอบว่าเป็นโหมด "Add" หรือ "Edit"
    const isEditMode = !!existingItem; // ถ้ามี existingItem = true (โหมดแก้ไข)

    // 4. ตั้งค่าเริ่มต้นให้ฟอร์ม (ถ้าเป็นโหมดแก้ไข)
    useEffect(() => {
        if (isEditMode) {
            // แปลง date ให้อยู่ใน format 'yyyy-MM-dd' ที่ input type="date" อ่านได้
            const prodDate = new Date(existingItem.production_date).toISOString().split('T')[0];
            const expiryDate = new Date(existingItem.expiry_date).toISOString().split('T')[0];

            setFormData({
                name: existingItem.name,
                quantity: existingItem.quantity,
                category: existingItem.category,
                location: existingItem.location,
                production_date: prodDate,
                expiry_date: expiryDate,
            });
        }
    }, [existingItem, isEditMode]);

    // 5. ฟังก์ชันเมื่อมีการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 6. ฟังก์ชันเมื่อกดปุ่ม Submit (Add หรือ Update)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // แปลงค่า quantity ให้เป็นตัวเลขก่อนส่ง
        const itemData = {
            ...formData,
            quantity: Number(formData.quantity),
        };

        if (isEditMode) {
            dispatch(updateItem({ id: existingItem.id, ...itemData }));
            if (onCancelEdit) onCancelEdit(); // ปิดฟอร์มแก้ไข
        } else {
            dispatch(addItem(itemData));
            // ล้างฟอร์ม
            setFormData({
                name: '',
                quantity: 0,
                category: '',
                location: '',
                production_date: '',
                expiry_date: '',
            });
        }
    };

    // 7. [ใหม่!] สร้าง Class ร่วมสำหรับ Input เพื่อให้โค้ดสะอาด
    const inputClasses =
        "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400";

    // 8. ส่วนแสดงผล (JSX)
    return (
        // [ใหม่!] อัปเกรดเงาและขอบมน
        // โค้ดใหม่ที่ถูกต้อง
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
            {/* [ใหม่!] เปลี่ยนสี Title ให้เข้าธีม */}
            <h2 className="text-2xl font-bold mb-5 text-pink-500">
                {isEditMode ? 'Edit Item' : 'Add New Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses} // [ใหม่!] ใช้ class ร่วม
                        required
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={inputClasses} // [ใหม่!] ใช้ class ร่วม
                        required
                        step="0.01"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={inputClasses} // [ใหม่!] ใช้ class ร่วม
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location:</label>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={inputClasses} // [ใหม่!] ใช้ class ร่วม
                    >
                        <option value="">Select location...</option>
                        <option value="ตู้เย็น">ตู้เย็น</option>
                        <option value="ในครัว">ในครัว</option>
                    </select>
                </div>

                {/* Production Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Production Date:</label>
                    <input
                        type="date"
                        name="production_date"
                        value={formData.production_date}
                        onChange={handleChange}
                        className={inputClasses} // [ใหม่!] ใช้ class ร่วม
                        required
                    />
                </div>

                {/* Expiry Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date:</label>
                    <input
                        type="date"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                        className={inputClasses} // [ใหม่!] ใช้ class ร่วม
                        required
                    />
                </div>

                {/* VVV [ใหม่!] เปลี่ยนสีปุ่ม VVV */}
                <div className="flex space-x-2 pt-2">
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex-grow"
                    >
                        {isEditMode ? 'Update' : 'Add'}
                    </button>
                    {isEditMode && onCancelEdit && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ItemForm;