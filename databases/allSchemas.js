import Realm from 'realm';
export const Item_SCHEMA = "Item";
// Define your models and their properties
export const ItemSchema = {
    name: Item_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        rawData: 'string',
        creationDate: 'date',
    }
};
const databaseOptions = {
    path: 'ItemApp.realm',
    schema: [ItemSchema],   
};
//functions for Items
export const insertNewItem = newItem => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(Item_SCHEMA, newItem);
            resolve(newItem);
        });
    }).catch((error) => reject(error));
});
export const updateItem = Item => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let updatingItem = realm.objectForPrimaryKey(Item_SCHEMA, Item.id);   
            updatingItem.rawData = Item.rawData;    
            resolve();     
        });
    }).catch((error) => reject(error));;
});
export const deleteItem = ItemId => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let deletingItem = realm.objectForPrimaryKey(Item_SCHEMA, ItemId);
            realm.delete(deletingItem);
            resolve();   
        });
    }).catch((error) => reject(error));;
});
export const deleteAllItems = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allItems = realm.objects(Item_SCHEMA);
            realm.delete(allItems);
            resolve();
        });
    }).catch((error) => reject(error));;
});
export const queryAllItems = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allItems = realm.objects(Item_SCHEMA);
        resolve(allItems);  
    }).catch((error) => {        
        reject(error);  
    });;
});
export default new Realm(databaseOptions);