import React, { Component } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import AllCategory from "../components/AllCategory";

const { TabPane } = Tabs;

const AllCategoryContainer = (props) => {
  const { categorys } = props;
  return (
    <Tabs type="card" tabPosition="right">
      <TabPane tab="All" key="1">
        <AllCategory categorys={categorys} />
      </TabPane>
      <TabPane tab="Uncompleted" key="2">
        <AllCategory
          categorys={categorys.filter((category) => !category.complete)}
        />
      </TabPane>
      <TabPane tab="Completed" key="3">
        <AllCategory
          categorys={categorys.filter((category) => category.complete)}
        />
      </TabPane>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  return {
    categorys: state,
  };
};

export default connect(mapStateToProps)(AllCategoryContainer);
