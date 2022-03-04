import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useLazyQuery, useMutation } from "@apollo/client";
import { get, isEmpty } from "lodash";

import LogoIUH from "assets/images/Logo_IUH.png";
import queries from "core/graphql";
import { LOGIN_FRAGMENT } from "./fragment";
import { clientCache } from "helpers";
import "./login.scss";

const prefix = "login";
const loginQuery = queries.mutation.login(LOGIN_FRAGMENT);

const Login = () => {
  /**
   * API
   * ===================================================================
   *
   */

  const [actLogin, { loading: loadingLogin }] = useMutation(loginQuery, {
    fetchPolicy: "network-only",
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, "login.errors", []);

      if (!isEmpty(errors)) {
        return errors?.map((item) =>
          notification["error"]({
            message: item?.message,
          })
        );
      }

      const token = get(dataReturn, "login.data.token", "");

      if (!isEmpty(token)) {
        clientCache?.setAuthenTokenWithCookie({ id_token: token });
        window.location.href = window.location.origin;
        return;
      }

      notification["error"]({
        message: "Lỗi kết nối!",
      });
    },
  });

  const handleSubmitForm = (value) => {
    actLogin({
      variables: {
        user_name: value?.username,
        password: value?.password,
      },
    });
  };

  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}__wrap-form`}>
        <img src={LogoIUH} alt="logo"></img>
        <div className={`${prefix}__wrap-form__form`}>
          <p className="form__title">Đăng nhập</p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmitForm}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Tài khoản..." />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu..." />
            </Form.Item>

            <Form.Item>
              <Button loading={loadingLogin} type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
