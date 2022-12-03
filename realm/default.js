import realm from "./realm";


export const saveNew = (className, data) => {
  const num = realm.objects(className).max("id") || 0;
  realm.write(() => {
    realm.create(className, {
      id: num + 3,
      ...data
    });
  });
}

export const updateObject = (className, id, data) => {
  realm.write(() => {
    const item = realm.objectForPrimaryKey(className, id);
    Object.keys(data).forEach(key => {
      item[key] = data[key]
    })
  })
}

export const findRecordById = (className, id) => {
  return realm.objectForPrimaryKey(className, id);
}

export const fetchObjects = (className, action, filter) => {
  let results = realm.objects(className)
  if (filter) { results = results.filtered(filter) }
  return action(results);
}

export const deleteItem = (className, id) => {
  const item = realm.objectForPrimaryKey(className, id);
  realm.write(() => {
    realm.delete(item);
  });
}