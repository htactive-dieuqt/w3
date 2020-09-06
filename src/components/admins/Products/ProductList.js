import React from "react";
import ProductListItem from "./ProductListItem";

export default function ProductList(props) {
  const { deleteItem, update, products, categories} = props;
  let listItems = products.map(item => (
    <ProductListItem
      key={item.id}
      item={item}
      deleteItem={deleteItem}
      update={update}
      categories={categories}
    />
  ));
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">LIST OF PRODUCTS</h3>
      </div>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>CATE ID</th>
                <th>NAME PRODUCT</th>
                <th>IMAGE</th>
                <th>DATE ADD</th>
                <th>DELETE AT</th>
                <th>PRICE IN</th>
                <th>PRICE OUT</th>
                <th>PRICE PROMOTION</th>
                <th>QUANTITY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
