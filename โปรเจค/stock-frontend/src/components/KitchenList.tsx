// src/components/KitchenList.tsx
// นี่คือ "โคลน" ของ ItemList.tsx ที่ผ่านการ "กรอง" แล้ว

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import {
    fetchItems,
    deleteItem,
    selectItems, // << เราจะใช้ตัวนี้
    selectLoading,
    selectError,
    type Item,
} from '../store/itemsSlice';
import ItemForm from './ItemForm';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

/* คอมโพเนนต์สำหรับแสดงของ "ในครัว" */
const KitchenList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // VVV [จุดแก้ไขที่ 1] - แก้ไขตรรกะการดึงข้อมูล VVV
    const allItems = useSelector(selectItems); // 1. ดึงของทั้งหมด
    const items = allItems.filter(item => item.location === 'ในครัว'); // 2. กรองเฉพาะ "ในครัว"
    // ^^^ จบจุดแก้ไข ^^^

    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

    useEffect(() => {
        // เรายังคงต้อง fetch ของ "ทั้งหมด" เพื่อให้ Redux มีข้อมูลมาให้กรอง
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

    if (loading) return <p className="text-center text-pink-400">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!Array.isArray(items)) {
        return <p className="text-center text-red-500">Error: Received invalid data</p>;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full">

            {/* VVV [จุดแก้ไขที่ 2] - เปลี่ยน Title VVV */}
            <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">
                🍳 Items in Kitchen 🍳
            </h2>
            {/* ^^^ จบจุดแก้ไข ^^^ */}

            {items.length === 0 ? (
                <p className="text-center text-lg text-pink-400 p-8">
                    No items found in the kitchen.
                </p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg border border-pink-100">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-sm text-pink-800 uppercase bg-pink-100 font-semibold">
                            <tr>
                                <th scope="col" className="px-6 py-4">Name (Qty)</th>
                                <th scope="col" className="px-6 py-4">Category</th>
                                {/* เราไม่จำเป็นต้องแสดง Location อีก เพราะเรารู้อยู่แล้วว่าคือ "ในครัว" */}
                                <th scope="col" className="px-6 py-4">Expires</th>
                                <th scope="col" className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="bg-white border-b border-pink-100 hover:bg-pink-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center space-x-3">
                                            <span>{item.name} ({item.quantity})</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.category}</td>
                                    <td className="px-6 py-4">
                                        {new Date(item.expiry_date).toLocaleDateString()}
                                    </td>
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
            )}

            {/* ส่วนฟอร์มแก้ไข (ทำงานได้เหมือนเดิม) */}
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

// VVV [จุดแก้ไขที่ 3] - เปลี่ยน Export VVV
export default KitchenList;
// ^^^ จบจุดแก้ไข ^^^