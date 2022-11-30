import { createStore, combineReducers } from 'redux';
import concept from './reducers/concept';
const rootReducer = combineReducers(
{ concept: concept }
);
const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;