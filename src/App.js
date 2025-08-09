
import React, { useState } from 'react';
import { Layout } from 'antd';
import './App.css';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppContent from './layout/Content';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader setCollapsed={() => setCollapsed(!collapsed)} />
      <Layout>
        <AppContent />
        <AppFooter />
      </Layout>
  </Layout>
  );
}

export default App;
