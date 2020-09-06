import React from "react";
import { Row, Col, Input, Button, Popover } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  FacebookOutlined,
  InstagramOutlined,
  QuestionOutlined,
  BellOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import "../../../asset/users/css/header.css";
import logo from "../../../asset/users/images/logo.png";
import { Link } from "react-router-dom";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#f53d2d",
    }}
  />
);

const content = (
  <div className="productincard">
    <div className="imgcard"></div>
    <div>
      <p>Chưa Có Sản Phẩm &#9785;</p>
    </div>
  </div>
);

const Header = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="header1">
          <Row>
            <Col span={10}>
              <div className="headerlist">
                <a href="#">Kênh Người Bán </a>
                <a href="#">Tải Ứng Dụng </a>
                <a href="#">Kết Nối </a>
                <a href="#">
                  <FacebookOutlined />
                </a>
                <a href="#">
                  <InstagramOutlined />
                </a>
              </div>
            </Col>
            <Col span={2}></Col>
            <Col span={12}>
              <div className="headerlist">
                <a href="#">
                  <BellOutlined />
                  Thông Báo
                </a>
                <a href="#">
                  <QuestionOutlined />
                  Trợ Giúp
                </a>
                <Link to="/singup-account">
                  {" "}
                  <a href="#">Đăng Ký</a>
                </Link>
                <Link to="/singin-account">
                  <a href="#">Đăng Nhập</a>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className="header2">
          <Row>
            <Col span={2}></Col>
            <Col span={3}>
              <img src={logo} alt="logoheader" />
            </Col>
            <Col span={12} className="inputsearch">
              <Search
                placeholder="Bạn cần tìm gì???"
                enterButton={<SearchOutlined />}
                size="large"
                suffix={suffix}
                onSearch={(value) => console.log(value)}
              />
            </Col>
            <Col span={3}>
              <Popover content={content}>
                <Button type="link" className="card">
                  <ShoppingCartOutlined />
                </Button>
              </Popover>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Header;
