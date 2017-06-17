import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios';

import Password from './Password';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    e.preventDefault();
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
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
    }).then((response) => {
      let jwt = response.data.data.authenticate.jwt;
      if (jwt === null) {
        alert("No user exists with those credentials");
      } else {
        alert("You're all signed in");
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">E-mail</Label>
                <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.onChangeEmail} />
              </FormGroup>
              <Password onChangePassword={this.onChangePassword} confirmPassword={this.props.showConfirmPassword}/>
                <Button onClick={this.onSubmit}>Submit</Button>
            </Form>
          </Col>
        </Row>
      </div >
    )
  }
}
