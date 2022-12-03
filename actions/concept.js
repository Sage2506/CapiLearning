import { SET_CONCEPT, SET_CONCEPTS } from "../constants/concept"

export const setConcepts = (data) => {
  return {
    type: SET_CONCEPTS,
    data
  }
}

export const setConcept = (data) => {
  return {
    type: SET_CONCEPT,
    data
  }
}