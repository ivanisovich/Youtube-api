import React from "react";
import { connect } from "react-redux";
import { getFavouritesRequest, getUserName } from "../../../redux/selectors";
import {
  getSearchVideo,
  changeFavouriteRequest,
} from "../../../redux/user-reducer";
import Favourites from "./Favourites";

const getFavourites = (userName) => {
  return JSON.parse(localStorage.getItem(userName));
};

class FavouritesContainer extends React.Component {
  render() {
    return (
      <Favourites
        favouritesRequest={
          getFavourites(this.props.userName) !== null
            ? getFavourites(this.props.userName)
            : []
        }
        getSearchVideo={this.props.getSearchVideo}
        changeRequest={this.props.changeFavouriteRequest}
      ></Favourites>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favouritesRequest: getFavouritesRequest(state),
    userName: getUserName(state),
  };
};

const mapDispatchToProps = {
  getSearchVideo,
  changeFavouriteRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouritesContainer);
