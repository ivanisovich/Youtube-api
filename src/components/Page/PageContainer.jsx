import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../../redux/auth-reducer";
import { withAuthRedirect } from "../Hoc/withAuthRedirect";
import Page from "./Page";

class PageContainer extends React.Component {
  render() {
    return <Page name={this.props.name} logout={this.props.logout} />;
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = {
  logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(PageContainer);
