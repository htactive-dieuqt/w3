import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input, Space, Radio, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../firebase/firebase";
// import Home from '../../../App'

const SingUp = () => {
  const [Error, setError] = useState(null);
  const [PwError, setPwError] = useState(null);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [gender, setgender] = useState("");
  const [phone, setphone] = useState("");
  const [gmail, setgmail] = useState("");
  const [address, setaddress] = useState("");
  const [dayOfBirth, setdayOfBirth] = useState("");
  const [password, setpassword] = useState("");
  const [cFPassword, setCFPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const submitSignUp = () => {
    if (
      fName === "" ||
      lName === "" ||
      gmail === "" ||
      password === "" ||
      cFPassword === ""
    ) {
      setError("* Không được để trống");
      return true;
    }
    if (password !== cFPassword) {
      setPwError("* Password và Confirm Password không trùng!!");
      setpassword("");
      setCFPassword("");
      return true;
    }
    if (password.length <= 5) {
      setPwError("* Password phải >= 6 kí tự");
      setpassword("");
      setCFPassword("");
      return true;
    } else {
      setError(null);
      const todoRef = firebaseDB.ref("users");
      firebaseAuth.createUserWithEmailAndPassword(gmail, password);
      let userID = firebaseAuth.currentUser?.uid;
      const todo = {
        iduser: userID,
        fName: fName,
        lName: lName,
        gender: gender,
        phone: phone,
        gmail: gmail,
        dayOfBirth: dayOfBirth,
        address: address,
        password: password,
        roleUser: "user",
        avatarUser:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/1200px-Microsoft_Account.svg.png",
      };
      todoRef.push(todo);
      firebaseAuth.currentUser.updateProfile({
        photoURL: "http://localhost:3000/static/media/logofooter.87b938cf.png",
      });
      alert("Bạn đã đăng ký thành công!!");
    }
  };

  return (
    <div className="singup">
      <Row>
        <Col span={2}></Col>
        <Col span={18}>
          <p></p>
          <Form
            direction="vertical"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item label="First Name: ">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              <Input
                placeholder="Please enter your First Name"
                required
                onChange={(event) => setfName(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="Last Name: ">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              <Input
                placeholder="Please enter your Last Name"
                required
                onChange={(event) => setlName(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="Address: ">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              <Input
                placeholder="Please enter your Address"
                required
                onChange={(event) => setaddress(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="Day Of Birth: ">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              <Input
                type="date"
                id="birthday"
                name="birthday"
                required
                onChange={(event) => setdayOfBirth(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="Gender">
              <Radio.Group name="radiogroup" wrapperCol={{ span: 18 }}>
                <Radio
                  value="Male"
                  checked={gender === 1}
                  onChange={(event) => setgender(event.target.value)}
                >
                  Male
                </Radio>
                <Radio
                  value="Female"
                  checked={gender === 2}
                  onChange={(event) => setgender(event.target.value)}
                >
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Phone Number: ">
              <Input
                placeholder="Please enter your Phone Number"
                type="number"
                required
                onChange={(event) => setphone(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="Gmail: ">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              <Input
                placeholder="Please enter Gmail"
                required
                onChange={(event) => setgmail(event.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="PassWord:">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              {PwError && <p style={{ color: "red" }}>{PwError}</p>}
              <Input.Password
                placeholder="Password >= 6 characters"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(event) => setpassword(event.target.value)}
              />
            </Form.Item>
            <Form.Item label="Confirm PassWord:">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              {PwError && <p style={{ color: "red" }}>{PwError}</p>}
              <Input.Password
                placeholder="Confirm Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(event) => setCFPassword(event.target.value)}
              />
            </Form.Item>
            <Form.Item label="Roles:">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              {PwError && <p style={{ color: "red" }}>{PwError}</p>}
              <Checkbox id="0" name="roleUser" value="user">
                {" "}
                Author
              </Checkbox>
              <Checkbox id="1" name="roleAdmin" value="admin">
                Editor
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => submitSignUp()}>Đăng Ký</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default SingUp;
