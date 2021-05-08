import React from 'react'
import { FlatList } from 'react-native'

import { PropertyItem } from './PropertyItem'

export const DisplayPropertyList = ({ fullDataList, navigation, currentRegion }) => {
    console.log(fullDataList)
    return (
        <FlatList 
            data={fullDataList}
            numColumns={2}
            keyExtractor={(l, i) => i.toString()}
            renderItem={({ item }) => {
                return (
                    <PropertyItem 
                        propertyInfo={item}
                        navigation={navigation}
                        currentRegion={currentRegion}
                    />
                )
            }}
        />
    )
}