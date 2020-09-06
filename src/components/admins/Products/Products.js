import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { firebase } from "../../../firebase/firebase";
import { firebaseDB, firebaseStorage } from "../../../firebase/firebase";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "react-bootstrap";

const Products = () => {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [ImageAsUrl, setImageAsUrl] = useState();

  useEffect(() => {
    firebase
      .database()
      .ref("products")
      .on("value", (snapshot) => {
        if (snapshot.val() != null)
          setContactObjects({
            ...snapshot.val(),
          });
      });
  }, []);

  const addOrEdit = (obj, image_url) => {
    // eslint-disable-next-line eqeqeq
    let upload = firebaseStorage
      .ref()
      .child(`image_Product/${image_url.name}`)
      .put(image_url);

    upload.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        firebaseStorage
          .ref("image_Product")
          .child(image_url.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            firebaseDB
              .ref()
              .child("products")
              .push(
                {
                  category: obj.category,
                  name: obj.name,
                  image: fireBaseUrl,
                  price: obj.price,
                  color: obj.color,
                  quantity: obj.quantity,
                  size: obj.size,
                },
                (err) => {
                  if (err) console.log(err);
                  else setCurrentId("");
                }
              );
          });
      }
    );

    console.log("log imgage link", ImageAsUrl);
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record???")) {
      firebase
        .database()
        .ref(`products/${key}`)
        .remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <ProductForm {...{ addOrEdit, currentId, contactObjects }} />
        </div>

        <div className="col-12">
          <Table
            className="table table-border-left tablet-striped"
            striped
            bordered
            hover
            variant="dark"
          >
            <thead className="thead-light">
              <tr>
                <th>Categories</th>
                <th>Color</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObjects[id].category}</td>
                    <td>{contactObjects[id].color}</td>
                    <td>{contactObjects[id].image}</td>
                    <td>{contactObjects[id].name}</td>
                    <td>{contactObjects[id].price}</td>
                    <td>{contactObjects[id].quantity}</td>
                    <td>{contactObjects[id].size}</td>
                    <td>
                      <EditOutlined
                        style={{ fontSize: "16px", color: "#0000FF" }}
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      />{" "}
                      <DeleteOutlined
                        style={{ fontSize: "16px", color: "#EE0000" }}
                        onClick={() => {
                          onDelete(id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Products;
