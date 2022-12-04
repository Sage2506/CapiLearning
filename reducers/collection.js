import { SET_COLLECTION, SET_COLLECTIONS } from "../constants/collection"

const initialState = {
  collections : [],
  collection : {}
};

export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTIONS:
      return { ...state, collections: action.data };
    case SET_COLLECTION:
      return {...state, collection :action.data}
    default: return state;
  }

}

export default collectionReducer;