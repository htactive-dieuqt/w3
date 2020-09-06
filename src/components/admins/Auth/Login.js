import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from "semantic-ui-react";
import { firebase } from "../../../firebase/firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((signedInUser) => console.log(signedInUser))
      .catch((err) => {
        console.log("createUserWithEmailAndPassword err", err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false,
        });
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            Login
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                onChange={this.handleChange}
                value={email}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                value={password}
              />

              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>

          <Message>
            Don't have an account -<Link to="/register">- Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
