import { SET_CONCEPTS } from "../constants/concept"

export const setConcepts = (data) => {
  return {
    type: SET_CONCEPTS,
    data
  }
}