// import realm from "./realm";


// saveConcept(newConcept) {

//   realm.write(() => {
//     realm.create("Concept", {
//       name: newConcept.name,
//       meaning: newConcept.meaning,
//       phonetic: newConcept.phonetic,
//       image: newConcept.image,
//       collection_id: newConcept.collection_id,
//     }, UpdateMode.Modified);
//   });
//   Concepts.checkPermission();
// }

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

// fetchConcepts(){
//   const concepts = realm.objects('Concept');
//   return concepts;
// }

// deleteConcept(recordID){
//   const concepts = realm.objects("Contact");
//   const conceptsWithoutThumbnail = concepts.filtered(`recordID == '${recordID}'`)
//   conceptsWithoutThumbnail.forEach(contact => {
//     realm.write(() => {
//       realm.delete(contact);
//     });
//   })
// }