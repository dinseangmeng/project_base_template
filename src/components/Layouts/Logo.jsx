import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo.png";
import { DoubleLeftOutlined } from "@ant-design/icons";
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
            <h3>Full name</h3>
          </div>
          {!isMobile && (
            <DoubleLeftOutlined onClick={() => setCollapsed(true)} style={{ fontSize: "18px", cursor: "pointer", backgroundColor: "#e6f4ff", borderRadius: "50%", padding: "4px", }} />
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
