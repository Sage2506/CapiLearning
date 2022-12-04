import { setCollections } from "../actions/collection";
import { fetchObjects, findRecordById, saveNew, updateObject, deleteItem } from "./default";
import realm from "./realm";

const CLASS_NAME = 'Collection';

export const saveCollection = (newCollection) => {
  saveNew(CLASS_NAME, newCollection)
}

export const updateCollection = (id, newCollection) => {
  updateObject(CLASS_NAME, id, newCollection);
}

export const findCollectionById = (id) => {
  return findRecordById(CLASS_NAME, id);
}

export const fetchCollections = (filter) => {
  return fetchObjects(CLASS_NAME, setCollections, filter)
}

deleteCollection = (id) => {
  deleteItem(CLASS_NAME, id)
}