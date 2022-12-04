import { createStore, combineReducers } from 'redux';
import concept from './reducers/concept';
import collectionsReducer from './reducers/collection';
const rootReducer = combineReducers(
{ concept: concept, collection: collectionsReducer }
);
const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;