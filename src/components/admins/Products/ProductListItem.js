import React from "react";

export default class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      updateProduct: this.props.item
    };
  }

  hanleUpdate = () => {
    this.setState(prevState => ({
      isUpdating: !prevState.isUpdating
    }));
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      updateProduct: {
        ...prevState.updateProduct,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("products", this.state.updateProduct);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("products", this.state.updateProduct.id);
  };

  render() {
    const { categories } = this.props;
    const { isUpdating } = this.state;
    const {
      cateID,
      dateAdd,
      deleteAt,
      image,
      name,
      priceIn,
      priceOut,
      pricePromotion,
      quantity,
      key
    } = this.props.item;

    return (
      <>
        <tr>
          <td key={key}>
            <select
              className="form-control"
              onChange={this.handleChange}
              className={`form-control ${isUpdating ? "" : "disable"}`}
            >
              {categories.map((item, index) => (
                <option
                  key={index}
                  selected={item.id === cateID ? "selected" : ""}
                  value={item.id}
                >
                  {item.cateName}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="name"
              defaultValue={name}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <img src={image} alt="Not Found" height="250px" width="250px" />
          </td>
          <td>
            <input
              type="date"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="dateAdd"
              defaultValue={dateAdd}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="date"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="deleteAt"
              defaultValue={deleteAt}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="priceIn"
              defaultValue={priceIn}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="priceOut"
              defaultValue={priceOut}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="pricePromotion"
              defaultValue={pricePromotion}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="number"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="quantity"
              defaultValue={quantity}
              onChange={this.handleChange}
            />
          </td>
          <td>
            {isUpdating ? (
              <span>
                <button
                  className="btn btn-success btn-control"
                  onClick={this.saveUpdate}
                >
                  <i className="fa fa-floppy-o" />
                </button>
                <button
                  className="btn btn-secondary btn-control"
                  onClick={this.hanleUpdate}
                >
                  <i className="fa fa-ban" />
                </button>
              </span>
            ) : (
              <button
                className="btn btn-warning margin btn-control"
                onClick={this.hanleUpdate}
              >
                <i className="fa fa-pencil" />
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() =>
                window.confirm("Do you want to delete this task?")
                  ? this.deleteItem()
                  : ""
              }
            >
              <i className="fa fa-trash-o" />
            </button>
            &nbsp;
          </td>
        </tr>
      </>
    );
  }
}
