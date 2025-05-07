import React from 'react';
import { Layout, Avatar, Badge, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = ({ children }) => {
  const navigate = useNavigate();

  return (
    <AntHeader style={{ 
      background: '#fff', 
      padding: '0 24px', 
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {children}
        <Title level={4} style={{ margin: 0, marginLeft: children ? 16 : 0 }}>Dashboard</Title>
      </div>
      
      <Space size="large">
        <SearchOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        <Badge count={5}>
          <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        </Badge>
        <Space style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
          <Avatar icon={<UserOutlined />} />
          <span>John Doe</span>
        </Space>
      </Space>
    </AntHeader>
  );
};

export default Header; 