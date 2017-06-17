import React from 'react';
import classnames from 'classnames';
import { Button, Form, FormGroup, Label, Input, Nav, NavItem, NavLink, TabContent, Row, Col, TabPane } from 'reactstrap';
import axios from 'axios';

const SIGN_IN = "1"
const SIGN_UP = "2"

const passwordsMatch = (password, confirmPassword) => {
  if (password === "" || confirmPassword === "") return true;
  return password === confirmPassword;
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: SIGN_IN,
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMatch: false,
      passwordTouched: false,
      confirmPasswordTouched: false
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    e.preventDefault();
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordTouched: true
    });
    e.preventDefault();
  }

  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      confirmPasswordTouched: true,
      passwordsMatch: passwordsMatch(this.state.password, e.target.value)
    })

    e.preventDefault();
  }

  onSubmit = (e) => {
    let email = this.state.email;
    let password = this.state.password;

    console.log("Submitting ", email, " ", password);
    e.preventDefault();
    axios.post('http://localhost:3000/graphql', {
      "query": `
mutation {
  authenticate(input: {
    email: "${email}"
    password: "${password}"
  }) {
    jwt 
  }
}
      `
    }).then( (response) => {
      let jwt = response.data.data.authenticate.jwt;
      if (jwt === null) {
        alert("No user exists with those credentials");
      } else {
        alert("You're all signed in");
      }
    });
  }

  confirmPasswordFormGroupColor = () => {
    if (!this.state.passwordTouched || !this.state.confirmPasswordTouched) return;
    if (this.state.password === "" || this.state.confirmPassword === "") return;
    return this.state.password === this.state.confirmPassword ? "success" : "danger";
  }

  render() {
    return (
      <div className="container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === SIGN_IN })}
              onClick={() => { this.toggle(SIGN_IN); }}
            >
              Sign In
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === SIGN_UP })}
              onClick={() => { this.toggle(SIGN_UP); }}
            >
              Sign Up
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={SIGN_IN}>
            <Row>
              <Col sm="12">
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">E-mail</Label>
                    <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.onChangeEmail} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.onChangePassword} />
                  </FormGroup>
                  <Button onClick={this.onSubmit}>Submit</Button>
                </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={SIGN_UP}>
            <Row>
              <Col sm="12">
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">E-mail</Label>
                    <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.onChangeEmail} />
                  </FormGroup>
                  <FormGroup color={this.confirmPasswordFormGroupColor()}>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.onChangePassword} />

                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input type="password" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
                    <Button onClick={this.onSubmit}>Submit</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}