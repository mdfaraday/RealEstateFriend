import React, { useState } from 'react'
import { Text, View, TouchableOpacity,  } from 'react-native'
import {  } from 'react-native-paper'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

const Title = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
    color: white
`
const IconContainer = styled(TouchableOpacity)`
    position: absolute
    top: 10px
    right: 10px
`

export const RegionCard = ({ regionTitle, deleteRegionByName, regionSelected, fullDataList }) => {
    const [selected, setSelected] = useState('') //this is to compare if the selected resource matches the region title to show which one is selected.
    //console.log(regionTitle + ' RegionCard')
    const transformedName = regionTitle.replace(/_/g, ' ')

    const choseRegion = () => {
        for (let i=0; i < fullDataList.length; i ++) {
            if (fullDataList[i].regionName === selected.toString()) {
                regionSelected(selected, i) //i is to set the index of which resource to load the sections of in NutritionInfo screen. 
            }
        }
    }

    const RegionBlock = styled(TouchableOpacity)`
    height: 120px
    width: 120px
    background-color: ${props => props.theme.colors.ui.secondary}
    border-radius: 20px
    border: ${regionTitle === selected ? '5px solid green' : '0 solid white' }
    margin: 10px
    justify-content: center
    align-items: center
    `

    const selectRegion = () => {
        choseRegion()
        setSelected(regionTitle) //sets up getting the border around the selected region.
        console.log(regionTitle + ' regionTitle')
    }

    return (
        <RegionBlock onPress={selectRegion}>
            <IconContainer onPress={() => deleteRegionByName(transformedName)}>
                <Feather name="x-circle" size={24} color="white" />
            </IconContainer>
            <Title>{transformedName}</Title>
        </RegionBlock>
    )
}