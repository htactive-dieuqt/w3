import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";

export default class FormAddProduct extends Component {
  state = {
    isOpenForm: false,
    newProduct: {
      cateID: "",
      dateAdd: "",
      dateAt: "",
      description: "",
      image: "",
      name: "",
      priceIn: "",
      priceOut: "",
      pricePromotion: "",
      quantity: "",
      url: "",
      progress: 0
    },
    errors: []
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  handleChangeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(
        {image}
      );
    }
  };

  addNewProduct = event => {
    const { image } = this.state;
    console.log(image,"image")
    const uploadTask = this.props.firebase.storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      error => {
        console.log(error);
      },
      () => {
        this.props.firebase.storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log("url", url);
            this.setState({ url });
          });
      }
    );
    event.preventDefault();
   
      this.props.addNew("products", this.state.newProduct);
      this.setState({
        isOpenForm: false
      });
    
  };
  closeError = () => {
    this.setState({
      errors: []
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    console.log(name);

    this.setState(prevState => ({
      ...prevState,
      newProduct: {
        ...prevState.newProduct,
        [name]: value
      }
    }));
  };

  checkValidate = () => {
    const {
      cateID,
      dateAdd,
      description,
      image,
      name,
      priceIn,
      priceOut,
      pricePromotion,
      quantity
    } = this.state;
    let errors = [];
    if (!cateID) {
      errors.push("Category's name is required");
    }
    if (!dateAdd) {
      errors.push("Date add product is required");
    }
    if (!description) {
      errors.push("Product's description is required");
    }
    if (!priceIn) {
      errors.push("Product's price in is required");
    }
    if (!priceOut) {
      errors.push("Product's price out is required");
    }
    if (!pricePromotion) {
      errors.push("Product's price promotion is required");
    }
    if (!quantity) {
      errors.push("Product's quantity is required");
    }
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  render() {
    const { isOpenForm, errors } = this.state;
    const { categories } = this.props;

    return (
      <div>
        <form>
          <div className="panel panel-default">
            <div className="panel-heading">
              <button
                type="button"
                className="btn"
                onClick={this.handleOpenForm}
              >
                {isOpenForm ? "CANCEL" : "ADD NEW"}
              </button>
            </div>
            {isOpenForm ? (
              <div className="panel-body row" id="form-add">
                {errors.length > 0 ? (
                  <>
                    <div className="col-md-1" />
                    <div className="alert alert-danger col-md-10">
                      <a className="close" onClick={this.closeError}>
                        ×
                      </a>
                      <ul>
                        {errors.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="form-group col-md-6">
                  <label>Product's name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Date Add Product</label>
                  <input
                    name="dateAdd"
                    type="date"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Description</label>
                  <input
                    name="description"
                    type="text"
                    placeholder="Enter product's description"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's image</label>
                  <progress value={this.state.progress} max="100" />
                  <input
                    name="image"
                    type="file"
                    placeholder="Please choose a product's image"
                    className="form-control"
                    onChange={this.handleChangeImage}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Price In</label>
                  <input
                    name="priceIn"
                    type="text"
                    placeholder="Enter price in's product"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Price Out</label>
                  <input
                    name="priceOut"
                    type="text"
                    placeholder="Enter price out's product"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Price Promotion</label>
                  <input
                    name="pricePromotion"
                    type="text"
                    placeholder="Enter price promotion's product"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Category</label>
                  <select
                    className="form-control"
                    onChange={this.handleChange}
                    name="cateID"
                  >
                    {categories.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.cateName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label>Product's quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Enter product's quantity"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.addNewProduct}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}
