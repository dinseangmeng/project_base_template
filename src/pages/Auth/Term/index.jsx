import React from "react";
import { Typography, Button, Divider } from "antd";
import { ArrowLeftOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.css";

const { Title, Paragraph, Text } = Typography;

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page">
      <div className="terms-header">
        <div className="terms-header-content">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(-1)}
            className="back-button"
          >
            Back
          </Button>
          <div className="header-title">
            <FileTextOutlined className="header-icon" />
            <Title level={2}>Terms and Conditions</Title>
          </div>
          <Text type="secondary" className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </div>
      </div>

      <div className="terms-body">
        <div className="terms-content">
          <div className="terms-intro">
            <Paragraph className="intro-text">
              Welcome to our Terms and Conditions. This document outlines the rules, guidelines, and agreements that govern your use of our application.
            </Paragraph>
          </div>

          <Divider className="section-divider" />

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">01</span>
              Acceptance of Terms
            </Title>
            <Paragraph>
              By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
            </Paragraph>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">02</span>
              Use License
            </Title>
            <Paragraph>
              Permission is granted to temporarily download one copy of the application per device for personal, non-commercial transitory viewing only.
            </Paragraph>
            <Paragraph>
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </Paragraph>
            <ul className="terms-list">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in the application</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">03</span>
              User Account
            </Title>
            <Paragraph>
              To access certain features of the application, you may be required to create an account. You are responsible for:
            </Paragraph>
            <ul className="terms-list">
              <li>Maintaining the confidentiality of your account information</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">04</span>
              Privacy Policy
            </Title>
            <Paragraph>
              Your use of the application is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the application and informs users of our data collection practices.
            </Paragraph>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">05</span>
              Disclaimer
            </Title>
            <Paragraph>
              The materials on the application are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Paragraph>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">06</span>
              Limitations
            </Title>
            <Paragraph>
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the application.
            </Paragraph>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">07</span>
              Revisions and Errata
            </Title>
            <Paragraph>
              The materials appearing on the application could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the application are accurate, complete, or current.
            </Paragraph>
          </section>

          <section className="terms-section">
            <Title level={3} className="section-title">
              <span className="section-number">08</span>
              Contact Information
            </Title>
            <Paragraph>
              If you have any questions about these Terms and Conditions, please contact us at:
            </Paragraph>
            <div className="contact-info">
              <Paragraph>
                <strong>Email:</strong> support@yourapp.com
              </Paragraph>
              <Paragraph>
                <strong>Phone:</strong> +1 (555) 123-4567
              </Paragraph>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
