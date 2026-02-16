// src/store/itemsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from './index';

// 1. กำหนด URL ของ Back-end ที่เราสร้างไว้
const API_URL = 'http://localhost:3000/items';

// 2. กำหนดโครงสร้างข้อมูล (Type) ของสินค้า
export interface Item {
    id: number;
    name: string;
    quantity: number;
    category: string;
    location: string;
    production_date: string; // ใช้ string เพื่อความง่ายในการจัดการในฟอร์ม
    expiry_date: string;
}

// 3. กำหนดหน้าตาของ State (ข้อมูลส่วนกลาง)
interface ItemState {
    items: Item[];
    loading: boolean;
    error: string | null;
}

// 4. กำหนดค่าเริ่มต้น
const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
};

// 5. สร้าง AsyncThunks (ฟังก์ชันสำหรับคุยกับ API)
// ----------------------------------------------
// 5.1 - Fetch (R - Read: ดึงข้อมูลทั้งหมด)
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get<Item[]>(API_URL);
    return response.data;
});

// 5.2 - Add (C - Create: เพิ่มข้อมูล)
// (รับข้อมูลสินค้าใหม่ โดยตัด id ออก)
export const addItem = createAsyncThunk(
    'items/addItem',
    async (newItem: Omit<Item, 'id'>) => {
        const response = await axios.post<Item>(API_URL, newItem);
        return response.data;
    },
);

// 5.3 - Update (U - Update: แก้ไขข้อมูล)
// (รับข้อมูลสินค้าที่มี id)
export const updateItem = createAsyncThunk(
    'items/updateItem',
    async (updatedItem: Item) => {
        const response = await axios.put<Item>(
            `${API_URL}/${updatedItem.id}`, // ส่ง ID ไปใน URL
            updatedItem, // ส่งข้อมูลใหม่ไปใน Body
        );
        return response.data;
    },
);

// 5.4 - Delete (D - Delete: ลบข้อมูล)
// (รับแค่ id)
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
        return id; // ส่ง id กลับไปเพื่อบอกว่าลบตัวไหนสำเร็จ
    },
);
// ----------------------------------------------

// 6. สร้าง Slice (ตัวจัดการ State)
const itemsSlice = createSlice({
    name: 'items', // ชื่อของ state นี้
    initialState,
    reducers: {
        // เราไม่ใช้ Reducers ธรรมดาในโปรเจกต์นี้
        // เราจะใช้ extraReducers เพื่อจัดการกับ AsyncThunks
    },
    extraReducers: (builder) => {
        // --- จัดการตอน Fetch (ดึงข้อมูล) ---
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
                state.loading = false;
                state.items = action.payload; // ได้ข้อมูลมา ให้เขียนทับ state เดิม
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items';
            })

            // --- จัดการตอน Add (เพิ่มข้อมูล) ---
            .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
                state.items.push(action.payload); // เพิ่มข้อมูลใหม่ต่อท้าย state เดิม
            })

            // --- จัดการตอน Update (แก้ไขข้อมูล) ---
            .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
                // หาสินค้าตัวเดิมใน state
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload; // อัปเดตทับตัวเดิม
                }
            })

            // --- จัดการตอน Delete (ลบข้อมูล) ---
            .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
                // กรองเอาสินค้าตัวที่ถูกลบ (action.payload คือ id) ออกไป
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

// 7. Export สิ่งที่จำเป็น
export default itemsSlice.reducer; // ส่ง Reducer ให้ Store
// ส่ง Selectors ให้ Component ต่างๆ
export const selectItems = (state: RootState) => state.items.items;
export const selectLoading = (state: RootState) => state.items.loading;
export const selectError = (state: RootState) => state.items.error;