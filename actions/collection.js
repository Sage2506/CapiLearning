import { SET_COLLECTION, SET_COLLECTIONS } from "../constants/collection"

export const setCollections = (data) => {
  return {
    type: SET_COLLECTIONS,
    data
  }
}

export const setCollection = (data) => {
  return {
    type: SET_COLLECTION,
    data
  }
}