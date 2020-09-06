import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Header from "./components/users/Home/header";
import Footer from "./components/users/Home/footer";
import SignIn from "./components/SignIn/index";
import SignUp from "./components/SignUp/index";
import ProductList from "./components/users/ProductList/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          {" "}
          <Header />
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/singin-account" component={SignIn} />
            <Route path="/singup-account" component={SignUp} />
          </Switch>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
