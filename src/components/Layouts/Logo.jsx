import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo/logo.png";
import { DoubleLeftOutlined } from "@ant-design/icons";
import "./style/index.css";
const Logo = ({ collapsed, setCollapsed, isMobile }) => {


  return (
    <>
      {!collapsed ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
            padding: "0 24px",
            paddingTop: "1rem",
            paddingBottom: ".6rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "30px", height: "30px" }}
            />
            <h3>App Name</h3>
          </div>
          {!isMobile && (
            <DoubleLeftOutlined className="logo-icon" onClick={() => setCollapsed(true)} style={{ fontSize: "18px", cursor: "pointer",  borderRadius: "50%", padding: "4px",transition: "300ms" }} />
          )}
        </div>
      ) : (
        <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "space-between",
          padding: "0 24px",
          paddingTop: "1rem",
          paddingBottom: ".6rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "30px", height: "30px" }}
          />
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
