import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AdminApp from './cms/AdminApp.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';

// Both public pages and /admin must remove the boot splash after React initializes.
if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) {
  document.documentElement.classList.add('react-ready');
  document.getElementById('app-boot-status')?.remove();
}
const host = document.getElementById('root');
if (!host) throw new Error('Không tìm thấy phần tử #root trong index.html');
createRoot(host).render(
  <React.StrictMode>
    <ErrorBoundary>{window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/') ? <AdminApp/> : <App />}</ErrorBoundary>
  </React.StrictMode>,
);
