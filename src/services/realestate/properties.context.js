import React, { useState, createContext, useContext, useEffect } from 'react'
import { fetchAllData, createRegion, createRegionStep2, fetchTableByRegionName, fetchTableByPropertyName, removeRegion, removeRegionStep2, 
    resetAllData, removeSpecificRegionsWithThis, createProperty, createPropertyStep2, removeProperty, createWorkOrder, removeWorkOrder } from './properties.service'
import Region from '../../models/region'

export const RealEstateContext = createContext()

export const RealEstateContextProvider = ({ children }) => {
    const [propertiesData, setPropertiesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    //temp to help fix issues with saving/deleting from SQLite.
    //can input exact name of region into the delete button parameters which are located on the main screen to remove regions.
    const tempDeleteSpecificRegions = async (name) => {
        await removeSpecificRegionsWithThis(name)
    }

    const addRegion = async (newRegionName) => {
        try {
            await createRegion(newRegionName)
            await createRegionStep2(newRegionName)
            await loadProperties()
        } catch (e) {
            console.log('addRegion error')
            throw e
        }
    }

    const deleteRegion = async (name) => {
        try {
            await removeRegion(name)
        } catch (e) {
            console.log('deleteRegion Error 1')
            throw e
        }
        try {
            await removeRegionStep2(name)
        } catch (e) {
            console.log('deleteRegion Error 2')
            throw e
        }
        try {
            await loadProperties()
        } catch (e) {
            console.log('deleteRegion error 3')
            throw e
        }
    }

    const addProperty = async (propertyState) => {
        try {
            await createProperty(propertyState)
        } catch (e) {
            console.log('addProperty error')
            throw e
        }
        try {
            await createPropertyStep2(propertyState)
        } catch (e) {
            console.log('addProperty error 2')
            throw e
        }
        try {
            await loadProperties()
        } catch (e) {
            console.log('addProperty error 3')
            throw e
        }
    }

    const deleteProperty = async (regionName, name) => {
        try {
            await removeProperty(regionName, name)
        } catch (e) {
            console.log('deleteProperty error 1')
            throw e
        }
        try {
            await loadProperties()
        } catch (e) {
            console.log('deleteProperty error 2')
            throw e
        }
    }

    const addWorkOrder = async (workOrder) => {
        try {
            await createWorkOrder(workOrder)
        } catch (e) {
            console.log('createWorkOrder error 1')
            throw e
        }
        try {
            await loadProperties()
        } catch (e) {
            console.log('createWorkOrder error 2')
            throw e
        }
    }

    const deleteWorkOrder = async (propertyName, workOrderName) => {
        try {
            await removeWorkOrder(propertyName, workOrderName)
        } catch (e) {
            console.log('deleteWorkOrder error 1')
            throw e
        }
        try {
            await loadProperties()
        } catch (e) {
            console.log('deleteWorkOrder error 2')
            throw e
        }
    }

    const loadProperties = async () => {
        try {
            const dbResult = await fetchAllData()
            //console.log(dbResult)
            let newArray = []
            if (dbResult.rows._array.length > 0) {
                for (let i=0;i<dbResult.rows._array.length;i++) {
                    const info = await fetchTableByRegionName(dbResult.rows._array[i].regionName) //returns an array of the properties for [i] region.
                    if (info.rows.length === 0) { //have to instead create a new region if no properties are under the region due to the way SQLite saves data (ie the array is left empty).
                        const newName = dbResult.rows._array[i].regionName.replace(/_/g, ' ')
                        newArray.push(new Region(newName, [])) //if no properties added yet.
                    } else {
                        //console.log('fetchingTableByName')
                        //console.log(dbResult.rows._array[i].regionName)
                        const newData = await fetchTableByRegionName(dbResult.rows._array[i].regionName)
                        //console.log(newData)
                        for (let j=0;j<dbResult.rows._array.length;j++) {
                            //console.log('inside for loop')
                            const newPropertyWorkOrders = await fetchTableByPropertyName(newData.rows._array[i].propertyName)
                            if (newPropertyWorkOrders.rows._array.length > 0) {
                                console.log('if success')
                                newArray.push({regionName: dbResult.rows._array[i].regionName, properties: [{propertyInfo: newData.rows._array[j], workOrders: newPropertyWorkOrders.rows._array}] }) //if WOs have been added.
                            } else {
                                console.log('if failure')
                                newArray.push({regionName: dbResult.rows._array[i].regionName, properties: [{propertyInfo: newData.rows._array[j], workOrders: []}] })
                            }
                        }

                    }
                }
            }
            setPropertiesData(newArray)
        } catch (e) {
            throw e
        }
    }

    //temp to help fix issues with saving/deleting from SQLite.
    const hardDataReset = async () => {
        try {
            await resetAllData()
        } catch (e) {
            console.log('hardDataReset Error')
            throw e
        }
    }

    return (
        <RealEstateContext.Provider
            value={{
                propertiesData,
                addRegion,
                loadProperties,
                deleteRegion,
                addProperty,
                deleteProperty,
                hardDataReset,
                tempDeleteSpecificRegions,
                addWorkOrder, 
                deleteWorkOrder
            }}
        >
            {children}
        </RealEstateContext.Provider>
    )
}