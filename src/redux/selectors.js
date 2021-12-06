export const getResult = (state) => {
  return state.user.resultRequest;
};

export const getTextRequest = (state) => {
  return state.user.request;
};

export const getTotalCount = (state) => {
  return state.user.count;
};

export const getUserName = (state) => {
  return state.user.userName;
};

export const getIsFetching = (state) => {
  return state.user.isFetching;
};

export const getFavouritesRequest = (state) => {
  return state.user.favouritesRequest;
};
