import { SET_CONCEPTS } from "../constants/concept"

const initialState = {
  concepts = []
};

export const conceptReducer = ( state = initialState, action) => {
  switch(action.type){
    case SET_CONCEPTS :
      return {...state,  concepts:action.data}
  }
}

export default conceptReducer;