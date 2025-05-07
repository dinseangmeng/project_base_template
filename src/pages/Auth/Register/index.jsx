import React from "react";
import { Form, Input, Button, Checkbox, Typography, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.css";

import logo from "../../../assets/images/Logo/logo.png";
import login_bg from "../../../assets/images/login_bg.png";

const { Title, Text } = Typography;

const Register = () => {
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
              Create Account!
            </Title>
            <Text className="login-subtitle">Join us and start your journey</Text>
          </div>
          <div className="login-image">
            <img src={login_bg} alt="Register" />
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="brand-logo">
              <img src={logo} alt="Logo" className="login-logo" />
              <h3>App Name</h3>
            </div>
            <Title className="login-form-title" level={3}>Sign Up</Title>
            <Text className="login-form-subtitle">
              Create your account to get started
            </Text>

            <Form
              name="register"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size="large"
              className="login-form"
            >
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: "Please input your full name!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 8 characters!" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions')),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create Account
                </Button>
              </Form.Item>

              <Divider>Or sign up with</Divider>

              <div className="social-login">
                <Button icon={<GoogleOutlined />} block>
                  Google
                </Button>
                <Button icon={<FacebookOutlined />} block>
                  Facebook
                </Button>
              </div>

              <div className="login-footer">
                <Text>Already have an account? </Text>
                <Link to="/login">Sign in</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
