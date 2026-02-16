// src/main.tsx (ในโปรเจกต์ stock-frontend)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// --- เพิ่ม 2 บรรทัดนี้ ---
import { Provider } from 'react-redux'; // 1. นำเข้า Provider
import store from './store'; // 2. นำเข้า "โกดัง" (store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    {/* 3. ครอบ <App /> ด้วย <Provider> และส่ง store เข้าไป */}
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
);