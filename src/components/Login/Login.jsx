import React from "react";
import "./Login.css";
import { Form, Input, Button } from "antd";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  return (
    <Form name="loginForm" className={"login_form"} onFinish={props.onSubmit}>
      <Form.Item name="login">
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password">
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={"login_form-button"}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = (props) => {
  const onSubmit = (data) => {
    props.login(data);
  };
  if (props.isAuth) {
    return <Redirect to="/page" />;
  }
  return (
    <div className={"login"}>
      <div className={"login_title"}>Вход</div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
