import React, { useState, useContext } from 'react'
import { Text, View, TouchableOpacity,  } from 'react-native'
import {  } from 'react-native-paper'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { theme } from '../../../infrastructure/theme'

import { RealEstateContext } from '../../../services/realestate/properties.context'

const Title = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
    font-family: roboto-medium
    padding: 3px
`
const IconContainer = styled(TouchableOpacity)`
    position: absolute
    top: 10px
    right: 10px
`

export const RegionCard = ({ regionTitle, deleteRegionByName, regionSelected, fullDataList }) => {
    const [selected, setSelected] = useState(false) //this is to compare if the selected resource matches the region title to show which one is selected.
    //console.log(regionTitle + ' RegionCard')
    const transformedName = regionTitle.replace(/_/g, ' ')
    const { loadProperties } = useContext(RealEstateContext)

    const choseRegion = () => {
        for (let i=0; i < fullDataList.length; i ++) {
            if (fullDataList[i].regionName === regionTitle) {
                regionSelected(regionTitle, i) //i is to set the index of which resource to load the properties of.
            }
        }
    }

    const RegionBlock = styled(TouchableOpacity)`
    height: 120px
    width: 120px
    background-color: white
    border-radius: 20px
    border: ${selected ? '5px solid green' : '0.5px solid gray' }
    margin: 10px
    justify-content: center
    align-items: center
    shadow-color: gray
    shadow-radius: 5px
    box-shadow: 2px 2px 2px
    `

    const selectRegion = () => {
        console.log(selected)
        if (selected) {
            return
        }
        setSelected(true) //sets up getting the border around the selected region.
        //console.log(regionTitle + ' regionTitle')
        choseRegion()
    }

    return (
        <RegionBlock onPress={selectRegion}>
            <IconContainer onPress={() => deleteRegionByName(transformedName)}>
                <Feather name="x-circle" size={24} color='red' />
            </IconContainer>
            <Title>{transformedName}</Title>
        </RegionBlock>
    )
}