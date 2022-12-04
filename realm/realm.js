import Realm from "realm";

class Concept extends Realm.Object { }
Concept.schema = {
  name: "Concept",
  properties: {
    id: "int",
    name: "string",
    meaning: "string",
    phonetic: "string?",
    image: "string?",
    collectionId: "int?"
  },
  primaryKey: "id",
};
class Collection extends Realm.Object { }
Collection.schema = {
  name: "Collection",
  properties: {
    id: "int",
    name: "string",
    bestPercent: "int?",
    bestQuantity: "int?",
    image: "string?",
  },
  primaryKey: "id",
};

export default new Realm({ schema: [Concept, Collection] });