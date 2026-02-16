// src/components/ItemList.tsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import {
    fetchItems,
    deleteItem,
    selectItems,
    selectLoading,
    selectError,
    type Item,
} from '../store/itemsSlice';
import ItemForm from './ItemForm'; // Import ฟอร์มสำหรับแก้ไข
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; // นำเข้าไอคอน

// 2. [ใหม่!] ฟังก์ชันที่ "ฉลาดขึ้น" สำหรับแสดง Emoji
const getCategoryEmoji = (category: string) => {
    const lowerCategory = category.toLowerCase();

    // [แก้ไข] เราใช้ "===" (ต้องตรงกันเป๊ะๆ) เพื่อแก้ปัญหา "ขนม" กับ "นม"
    if (lowerCategory === 'เนื้อสัตว์') {
        return '🥩';
    }

    if (lowerCategory === 'วัตถุดิบ' || lowerCategory.includes('ไข่')) return '🥚';
    if (lowerCategory === 'เครื่องปรุง') return '🧂';
    if (lowerCategory === 'ผัก') return '🥦';
    if (lowerCategory === 'นม' || lowerCategory === 'drink') return '🥛';

    // [ใหม่!] เพิ่มกฎที่ขาดหายไป
    if (lowerCategory === 'ขนม') return '🍬'; // "ขนม" (Snack) -> ได้รูป ลูกอม
    if (lowerCategory === 'ผลไม้') return '🍌'; // "ผลไม้" (Fruit) -> ได้รูป กล้วย

    // [DEFAULT]
    return '🛒'; // ถ้าไม่ตรงเลยจริงๆ ค่อยคืนค่ารถเข็น
};


/* คอมโพเนนต์สำหรับแสดง/แก้ไข/ลบ รายการสินค้า */
const ItemList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector(selectItems);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteItem(id));
        }
    };

    const handleEdit = (item: Item) => {
        setEditingItem(item);
    };

    const handleCancelEdit = () => {
        setEditingItem(undefined);
    };

    // 7. ส่วนจัดการการแสดงผล (Loading, Error)
    if (loading) return <p className="text-center text-pink-400">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!Array.isArray(items)) {
        return <p className="text-center text-red-500">Error: Received invalid data</p>;
    }

    // 8. ส่วนแสดงผลหลัก (JSX)
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full">
            <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">
                💖 My Item List 💖
            </h2>

            {items.length === 0 ? (
                <p className="text-center text-lg text-pink-400 p-8">
                    No items found. Add one!
                </p>
            ) : (
                //
                // VVV 9. ใช้ Table ที่ตกแต่งด้วยสีชมพู VVV
                //
                <div className="overflow-x-auto shadow-md rounded-lg border border-pink-100">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-sm text-pink-800 uppercase bg-pink-100 font-semibold">
                            <tr>
                                <th scope="col" className="px-6 py-4">Name (Qty)</th>
                                <th scope="col" className="px-6 py-4">Category</th>
                                <th scope="col" className="px-6 py-4">Location</th>
                                <th scope="col" className="px-6 py-4">Expires</th>
                                <th scope="col" className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="bg-white border-b border-pink-100 hover:bg-pink-50">

                                    {/* เพิ่ม Emoji นำหน้าชื่อ */}
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
                                            <span>{item.name} ({item.quantity})</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">{item.category}</td>
                                    <td className="px-6 py-4">{item.location}</td>
                                    <td className="px-6 py-4">
                                        {new Date(item.expiry_date).toLocaleDateString()}
                                    </td>

                                    {/* ปุ่ม Edit/Delete */}
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="font-medium text-purple-600 hover:text-purple-800 flex items-center space-x-1"
                                        >
                                            <FaPencilAlt /> <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="font-medium text-rose-500 hover:text-rose-700 flex items-center space-x-1"
                                        >
                                            <FaTrash /> <span>Delete</span>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                //
                // ^^^ จบส่วนของ Table ^^^
                //
            )}

            {/* 10. ส่วนฟอร์มแก้ไข */}
            {editingItem && (
                <div className="mt-6">
                    <ItemForm
                        existingItem={editingItem}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            )}
        </div>
    );
};

export default ItemList;