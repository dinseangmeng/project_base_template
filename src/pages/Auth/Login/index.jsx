import React from "react";
import { Form, Input, Button, Checkbox, Typography, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.css";

import logo from "../../../assets/images/Logo/logo.png";
import login_bg from "../../../assets/images/login_bg.png";

const { Title, Text } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-logo">
              <img src={logo} alt="Logo" className="login-logo" />
              <h3>App Name</h3>
            </div>
            <Title level={2} className="login-title">
              Welcome Back!
            </Title>
            <Text className="login-subtitle">Please sign in to continue</Text>
          </div>
          <div className="login-image">
            <img src={login_bg} alt="Login" />
          </div>
        </div>

        <div className="login-right">

          <div className="login-form-container">
          <div className="brand-logo">
              <img src={logo} alt="Logo" className="login-logo" />
              <h3>App Name</h3>
            </div>
            <Title className="login-form-title" level={3}>Sign In</Title>
            <Text className="login-form-subtitle">
              Enter your credentials to access your account
            </Text>

            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size="large"
              className="login-form"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <div className="login-form-options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign In
                </Button>
              </Form.Item>

              <Divider>Or continue with</Divider>

              <div className="social-login">
                <Button icon={<GoogleOutlined />} block>
                  Google
                </Button>
                <Button icon={<FacebookOutlined />} block>
                  Facebook
                </Button>
              </div>

              <div className="login-footer">
                <Text>Don't have an account? </Text>
                <Link to="/register">Sign up</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
