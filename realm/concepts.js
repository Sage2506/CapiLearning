import { setConcepts } from "../actions/concept";
import realm from "./realm";


export const saveConcept = (newConcept) => {
  const num = realm.objects('Concept').max("id") || 0;
  realm.write(() => {
    realm.create("Concept", {
      id: num+3,
      name: newConcept.name,
      meaning: newConcept.meaning,
      phonetic: newConcept.phonetic,
      image: newConcept.image,
      collection_id: newConcept.collection_id,
    });
  });
}

// updateConcept(recordID, editedConcept) {
//   const concepts = realm.objects("Concept");
//   const matchedConcept = concepts.filtered(`recordID == '${recordID}'`)

//   matchedConcept.forEach(concept => {
//     realm.write(() => {
//       concept.name : editedConcept.name
//       concept.meaning = editedConcept.meaning
//       concept.phonetic = editedConcept.phonetic
//       concept.image = editedConcept.image
//     });
//   })
// }

export const fetchConcepts = () => {
  const concepts = realm.objects('Concept');
  return setConcepts(concepts);
}

// deleteConcept(recordID){
//   const concepts = realm.objects("Contact");
//   const conceptsWithoutThumbnail = concepts.filtered(`recordID == '${recordID}'`)
//   conceptsWithoutThumbnail.forEach(contact => {
//     realm.write(() => {
//       realm.delete(contact);
//     });
//   })
// }