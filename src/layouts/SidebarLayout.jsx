import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Header from "../components/Layouts/Header";
import Logo from "../components/Layouts/Logo";
import "./style/index.css";

const { Sider, Content } = Layout;

const SidebarLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: 'mail',
      icon: <MailOutlined />,
      label: 'Navigation One',
      children: [
        {
          key: 'option1',
          label: 'Option 1',
        },
        {
          key: 'option2',
          label: 'Option 2',
        }
      ]
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider
        theme="light"
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        trigger={!isMobile ? null : undefined}
        style={{
          position: isMobile ? "fixed" : "relative",
          height: "100vh",
          zIndex: 1000,
          boxShadow:
            isMobile && !collapsed ? "2px 0 8px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        <Logo collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} />
        <Menu
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(`/${key}`);
            if (isMobile) {
              setCollapsed(true);
            }
          }}
        />
      </Sider>
      <Layout>
        <Header>
          {!isMobile && collapsed && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            width: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
