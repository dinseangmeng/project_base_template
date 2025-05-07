import React from 'react';
import { Layout, Avatar, Badge, Space, Typography,Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

import './style/index.css';


const Header = ({ children }) => {

  const navigate = useNavigate();


  const items = [
    {
      key: '1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/profile')}>
         
          <p>Profile</p>
        </div>
      ),
      
    },
    {
      key: '2',
      style: {
        color: '#1677ff',
      },
      label: (
        <div style={{ display: 'flex', alignItems: 'center',gap: "10px" }} onClick={() => navigate('/login')}>
           <LogoutOutlined />
          <p>Login</p>
        </div>
      ),
    },
  ];
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
        <Dropdown className="header-profile" menu={{ items }} trigger={['click']} >
          <Space  style={{ cursor: 'pointer' }} >
            <Avatar icon={<UserOutlined />} />
            <span>John Doe</span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header; 