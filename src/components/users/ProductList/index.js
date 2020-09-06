import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import "../../../asset/css/productList.css";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
    };
  }
  componentDidMount() {
    fetch("https://5ee7355452bb0500161fd5be.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => this.setState({ contacts: data }));
  }
  render() {
    return (
      <div className="content">
        <div className="flex-container">
          {this.state.contacts.map((contact, index) => (
            <div className="showProduct" key={index}>
              <img src={contact.image} alt="img product" />
              <div className="productInfor">
                <strong>{contact.nameProduct} &#10084;</strong>
                <Row>
                  <Col span={12} className="price">
                    <p>&#8363;{contact.price} </p>
                  </Col>
                  <Col span={12} className="buyed">
                    Đã bán 6
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
