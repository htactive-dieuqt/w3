import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { firebase } from "../../../firebase/firebase";
import { firebaseDB, firebaseStorage } from "../../../firebase/firebase";

const ProductForm = (props) => {
  const initialFieldValues = {
    category: "",
    color: "",
    name: "",
    price: "",
    image: "",
    quantity: "",
    size: "",
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    firebaseDB.ref("category").on("value", (snapshot) => {
      setCategories(snapshot.val());
    });
    console.log(categories, "categories1");
  }, []);

  var [values, setValues] = useState(initialFieldValues);
  var [imageFile, setImageAsFile] = useState();

  const handleInputFile = (e) => {
    console.log("file image", e);
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values, imageFile);
  };

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-image"></i>
              </div>
            </div>
            <input
              className="form-control"
              type="file"
              name="image"
              placeholder="Image"
              value={values.file}
              onChange={handleInputFile}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-image"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Color"
              name="color"
              value={values.color}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group input-group col-md-6">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-mug-hot"></i>
                </div>
              </div>

              <input
                className="form-control"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group col-md-6">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-list-alt"></i>
                </div>
              </div>
              <select
                className="form-control form-control-line"
                name="category"
                value={values.category}
                onChange={handleInputChange}
              ></select>
            </div>
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-money-check-alt"></i>
              </div>
            </div>
            <input
              className="form-control"
              name="price"
              placeholder="Price"
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-money-check-alt"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Quantity"
              name="quantity"
              type="number"
              value={values.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-money-check-alt"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="size"
              name="size"
              value={values.size}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <input
                type="submit"
                // eslint-disable-next-line eqeqeq
                value={props.currentId == "" ? "Save" : "Update"}
                className="btn btn-primary btn-block"
              />
            </div>
          </div>
        </form>
        {/* <Form autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <select
            className="form-control form-control-line"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          ></select>
          <input
            className="form-control"
            placeholder="Color"
            name="color"
            value={values.color}
            onChange={handleInputChange}
          />
          <input
            className="form-control"
            type="file"
            value={values.file}
            onChange={handleInputFile}
          />
          <input
            className="form-control"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
          <input
            className="form-control"
            placeholder="Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleInputChange}
          />
          <input
            className="form-control"
            placeholder="Quantity"
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleInputChange}
          />
          <input
            className="form-control"
            placeholder="size"
            name="size"
            value={values.size}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <input
              type="submit"
              // eslint-disable-next-line eqeqeq
              value={props.currentId == "" ? "Save" : "Update"}
              className="btn btn-primary btn-block"
            />
          </div>
        </div>
      </Form> */}
      </div>
    </div>
  );
};

export default ProductForm;
