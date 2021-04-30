import React, { useState, createContext, useContext, useEffect } from 'react'

export const RealEstateContext = createContext()

export const RealEstateContextProvider = ({ children }) => {
    const [propertiesData, setPropertiesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const addRegion = (newName) => {
        const newRegion = {
            name: newName,
            properties: []
        }
        setPropertiesData([...propertiesData, newRegion])
    }

    return (
        <RealEstateContext.Provider
            value={{
                propertiesData,
                addRegion
            }}
        >
            {children}
        </RealEstateContext.Provider>
    )
}