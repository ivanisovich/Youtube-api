import { YouTubeAPI } from "../api/api";
import { getUserName, getFavouritesRequest } from "./selectors";

const SEARCH_VIDEO = "SEARCH_VIDEO",
  LOGIN_NAME = "LOGIN_NAME",
  TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING",
  SAVE_REQUEST = "SAVE_REQUEST",
  CHANGE_REQUEST = "CHANGE_REQUEST";

const login = localStorage.getItem("user-name");

const saveChangeInLocalStorage = (getState) => {
  let state = getState();
  let name = getUserName(state);
  let favouritesRequest = getFavouritesRequest(state);

  localStorage.setItem(`${name}`, JSON.stringify(favouritesRequest));
};

const initialState = {
  userName: login,
  favouritesRequest: [],
  resultRequest: [],
  request: null,
  count: null,
  isFetching: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VIDEO: {
      return {
        ...state,
        resultRequest: action.result,
        request: action.request,
        count: action.totalCount,
      };
    }
    case LOGIN_NAME: {
      return {
        ...state,
        userName: action.userName,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case SAVE_REQUEST: {
      return {
        ...state,
        favouritesRequest: [
          ...state.favouritesRequest,
          {
            id: state.favouritesRequest.length + 1,
            request: action.newRequest.request,
            nameRequest: action.newRequest.nameRequest,
            sort: action.newRequest.sort,
            max_result: action.newRequest.max_result,
          },
        ],
      };
    }
    case CHANGE_REQUEST: {
      return {
        ...state,
        favouritesRequest: [
          ...state.favouritesRequest.map((request) => {
            if (request.id == action.requestId) {
              return action.changedRequest;
            }
            return request;
          }),
        ],
      };
    }

    default: {
      return state;
    }
  }
};

export const setResultSearch = (result, request, totalCount) => ({
  type: SEARCH_VIDEO,
  result,
  request,
  totalCount,
});
export const setUserName = (userName) => ({ type: LOGIN_NAME, userName });
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const setFavouriteRequest = (newRequest) => ({
  type: SAVE_REQUEST,
  newRequest,
});
export const setchangedRequest = (requestId, changedRequest) => ({
  type: CHANGE_REQUEST,
  requestId,
  changedRequest,
});

/* Thunk */
export const getSearchVideo =
  (textRequest, maxResults = 12, order = "viewCount") =>
  async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await YouTubeAPI.getVideo(textRequest, maxResults, order);
    dispatch(toggleIsFetching(false));
    dispatch(
      setResultSearch(
        response.items,
        textRequest,
        response.pageInfo.totalResults
      )
    );
  };

export const saveFavouriteRequest = (data) => async (dispatch, getState) => {
  dispatch(setFavouriteRequest(data));
  saveChangeInLocalStorage(getState);
};

export const changeFavouriteRequest =
  (requestId, changedRequest) => async (dispatch, getState) => {
    dispatch(setchangedRequest(requestId, changedRequest));
    saveChangeInLocalStorage(getState);
  };

export default userReducer;
