import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import SignIn from './SignIn';

const SIGN_IN = "1"
const SIGN_UP = "2"

export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: SIGN_IN,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
            <SignIn />
          </TabPane>
          <TabPane tabId={SIGN_UP}>
            <SignIn showConfirmPassword={true}/>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
