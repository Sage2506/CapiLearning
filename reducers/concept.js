import { SET_CONCEPT, SET_CONCEPTS } from "../constants/concept"

const initialState = {
  concepts : [],
  concept : {}
};

export const conceptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONCEPTS:
      return { ...state, concepts: action.data };
    case SET_CONCEPT:
      return {...state, concept :action.data}
    default: return state;
  }

}

export default conceptsReducer;