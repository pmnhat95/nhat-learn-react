
import React, { useState } from 'react';
import { Layout } from 'antd';
import './App.css';
import { AppHeader, AppFooter, AppContent } from './layout';

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
