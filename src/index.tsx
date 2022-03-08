import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import MorphsByAddressPage from './pages/MorphsByAddressPage';
import MorphDetailsPage from './pages/MorphDetailsPage';
import './polyfills';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/address/:account" element={<MorphsByAddressPage />} />
          <Route path="/token/:tokenId" element={<MorphDetailsPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
