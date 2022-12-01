import Realm from "realm";

class Concept extends Realm.Object { }
Concept.schema = {
    name: "Concept",
    properties: {
        id: "int",
        name: "string",
        meaning: "string",
        phonetic:"string?",
        image: "string?",
        collection_id:"string?"
    },
    primaryKey: "id",
};
class Collection extends Realm.Object { }
Collection.schema = {
    name: "Collection",
    properties: {
        id: "int",
        uid: "string?",
        name: "string",
        best_percent: "int?",
        best_quantity: "int?",
        image: "string?",
    },
    primaryKey: "id",
};

export default new Realm({ schema: [Concept, Collection] });