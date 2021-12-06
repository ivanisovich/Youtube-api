import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import Login from "./Login";

class LoginContainer extends React.Component {
  render() {
    return <Login isAuth={this.props.isAuth} login={this.props.login} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

let mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
