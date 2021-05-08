//this will connect to SQLite database to store property info.
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('regions.db')

export const initRegions = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS regions (id INTEGER PRIMARY KEY, regionName TEXT NOT NULL);',
            [],
            (_, result) => {
                resolve(result)
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work initRegions')
            }
            )
        })
    })
    return promise
}

//adds new region to region master list and creates a new table for the region itself which will contain the properties.
export const createRegion = (newRegionName) => {
    const newString = newRegionName.trim().replace(/\s/g, '_')
    //this first one adds the region to the main region list/table.
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO regions (regionName) VALUES (?);',
            [newString],
            (_, result) => {
                resolve(result)
                console.log('createRegion success')
            },
            (_, err) => {
                console.log('createRegion error')
                reject(err)
            }
            )
        })
    })
    return promise
}
export const createRegionStep2 = (newRegionName) => {
    const newString = newRegionName.trim().replace(/\s/g, '_')
    //this second one creates a new table specifically for the new region.
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${newString} ( id INTEGER PRIMARY KEY, propertyName TEXT, imageUri TEXT, description TEXT, address TEXT, purchaseCost TEXT, 
                rehabCost TEXT, mortgageCost TEXT, maintCost TEXT, monthlyRent TEXT, reserveAmt TEXT, sqft TEXT, acres TEXT, bedrooms TEXT, bathrooms TEXT, debtRemaining TEXT,
                downPayment TEXT);`,
            [],
            () => {
                resolve()
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work createRegionStep2')
            }
            )
        })
    })
    return promise
}

//deleting regions
export const removeRegion = (name) => {
    const newString = name.trim().replace(/\s/g, '_')
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DROP TABLE ${newString};`,
            [],
            () => {
                resolve()
                console.log('region table removed')
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work removeRegion')
            }
            )
        })
    })
    return promise
}
export const removeRegionStep2 = (name) => {
    const newString = name.trim().replace(/\s/g, '_')
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM regions WHERE regionName = ?;`,
            [newString],
            () => {
                resolve()
                console.log('region removed from regions')
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work removeRegionStep2')
            }
            )
        })
    })
    return promise
}

//it would be good to add a transform function that takes care of adding all of the underscores, also one for removing the underscoring when loading.
//adding properties to regions. Takes region name and adds an entry for the property to that table.
export const createProperty = (propertyState) => {
    console.log(propertyState)
    const newRegionName = propertyState.regionName.trim().replace(/\s/g, '_')
    const newName = propertyState.propertyName.trim().replace(/\s/g, '_')
    const newDescription = propertyState.description.trim().replace(/\s/g, '_')
    const newAddress = propertyState.address.trim().replace(/\s/g, '_')

    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO ${newRegionName} (propertyName, imageUri, description, address, purchaseCost, rehabCost, mortgageCost, maintCost, 
                monthlyRent, reserveAmt, sqft, acres, bedrooms, bathrooms, debtRemaining, downPayment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [newName, propertyState.imageUri, newDescription, newAddress, propertyState.purchaseCost, propertyState.rehabCost, propertyState.mortgageCost, propertyState.maintCost,
                propertyState.monthlyRent, propertyState.reserveAmt, propertyState.sqft, propertyState.acres, propertyState.bedrooms, propertyState.bathrooms,
                propertyState.debtRemaining, propertyState.downPayment],
            (_, result) => {
                console.log('createProperty success')
                resolve(result)
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work create property')
            }
            )
        })
    })
    return promise
}

//for deleting properties. Takes place from the PropertyDetailScreen.
export const removeProperty = (regionName, name) => {
    const newRegionName = regionName.trim().replace(/\s/g, '_')
    const newName = name.trim().replace(/\s/g, '_')
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM ${newRegionName} WHERE name = ?;`,
            [newName],
            (_, result) => {
                console.log('removeProperty success')
                resolve(result)
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work removeProperty')
            }
            )
        })
    })
    return promise
}

//initial load of data from master list of regions.
export const fetchAllData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM regions', //could add a 'WHERE' clause here if we wanted to.
            [],
            (_, result) => { //first arg in parentheses is '(like) the repetition of your query' whatever that means.
                resolve(result)
                //console.log(result)
            },
            (_, err) => {
                reject(err)
            }
            )
        })
    })
    return promise
}
//initial load of data of specific tables that have already been created and pulled from the master list of regions.
export const fetchTableByName = (tableName) => {
    const newString = tableName.trim().replace(/\s/g, '_')
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${newString}`,                             //there are currently NO PROPERTIES in these created tables.
            [],
            (_, result) => {
                //console.log(result)
                resolve(result)
            },
            (_, err) => {
                reject(err)
            }
            )
        })
    })
    return promise
}

export const resetAllData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('DROP TABLE regions',
            [],
            (_, result) => {
                resolve(result)
            },
            (_, err) => {
                reject(err)
            }
            )
        })
    })
    return promise
}








// TEMP TEMP TEMP


export const removeSpecificRegionsWithThis = (name) => {
    const newString = name.trim().replace(/\s/g, '_')
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM regions WHERE regionName = ?;`,
            [newString],
            () => {
                resolve()
                console.log('specific region has been removed')
            },
            (_, err) => {
                reject(err)
                console.log('Didnt work remove specific region')
            }
            )
        })
    })
    return promise
}