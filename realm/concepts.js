import { setConcepts } from "../actions/concept";
import { fetchObjects, findRecordById, saveNew, updateObject, deleteItem } from "./default";
import realm from "./realm";

const CLASS_NAME = 'Concept';

export const saveConcept = (newConcept) => {
  saveNew(CLASS_NAME, newConcept)
}

export const updateConcept = (id, newConcept) => {
  updateObject(CLASS_NAME, id, newConcept);
}

export const findConceptById = (id) => {
  return findRecordById(CLASS_NAME, id);
}

export const fetchConcepts = (filter) => {
  return fetchObjects(CLASS_NAME, setConcepts, filter)
}

deleteConcept = (id) => {
  deleteItem(CLASS_NAME, id)
}