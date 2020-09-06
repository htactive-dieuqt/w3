import React, { useState, useEffect } from "react";
import { firebaseAuth, firebaseStorage } from "../../../firebase/firebase";
import { Button, Row, Col, Form, Input, Space } from "antd";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const SingIn = () => {
  const [gmail, setgmail] = useState("");
  const [password, setpassword] = useState("");
  const [nameError, setNameError] = useState("");

  const submitSignIn = () => {
    if (gmail === "" || password === "") {
      setNameError("* Không được để trống");
      return true;
    } else {
      firebaseAuth
        .signInWithEmailAndPassword(gmail, password)
        .then((res) => {
          alert("User login successfully!");
          setgmail("");
          setpassword("");
        })
        .catch((err) =>
          console.log(
            "signInWithEmailAndPassword err",
            alert("nhập sai gmail hoặc password")
          )
        );
    }
  };

  return (
    <div className="singin">
      <Row>
        <Col span={2}></Col>
        <Col span={2}>
          <p></p>
          <h3>
            Để có thể mua hàng bạn vui lòng đăng ký tài khoản (chưa có tài
            khoản) hoặc đăng nhập (đã có tài khoản)
          </h3>
        </Col>
        <Col span={16}>
          <p></p>
          <Form
            direction="vertical"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item label="Gmail: ">
              <Input
                placeholder="Please enter your User Name"
                onChange={(event) => setgmail(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="PassWord:">
              <Input.Password
                placeholder="Confirm Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(event) => setpassword(event.target.value)}
              />
            </Form.Item>
            <Form.Item>
              {" "}
              <Button onClick={() => submitSignIn()}>Đăng Nhập</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default SingIn;
