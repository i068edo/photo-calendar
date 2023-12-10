import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Header } from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import { Contents } from './components/layouts/Contents';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Header />
    <Contents />
    <Footer />
  </React.StrictMode>
);
