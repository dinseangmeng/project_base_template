import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const BlankLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default BlankLayout; 