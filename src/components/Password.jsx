import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const passwordsMatch = (password, confirmPassword) => {
  if (password === "" || confirmPassword === "") return true;
  return password === confirmPassword;
};

export default class Password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      passwordsMatch: false,
      passwordTouched: false,
      confirmPasswordTouched: false
    };
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordTouched: true
    });
    e.preventDefault();
    this.props.onChangePassword(e);
  }

  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      confirmPasswordTouched: true,
      passwordsMatch: passwordsMatch(this.state.password, e.target.value)
    })

    e.preventDefault();
  }

  confirmPasswordFormGroupColor = () => {
    if (!this.state.passwordTouched || !this.state.confirmPasswordTouched) return;
    if (this.state.password === "" || this.state.confirmPassword === "") return;
    return this.state.password === this.state.confirmPassword ? "success" : "danger";
  }

  render() {
    return (
      <FormGroup color={this.confirmPasswordFormGroupColor()}>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.onChangePassword} />
        {this.props.confirmPassword &&
          <div>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
          </div>
        }
      </FormGroup>
    )
  }
}
