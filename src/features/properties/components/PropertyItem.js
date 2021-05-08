import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import styled from 'styled-components/native'

const Wrapper = styled.View`
    flex: 1
    align-items: center
    width: 100%
`
const PropertyCard = styled(TouchableOpacity)`
    margin-top: 10px
    width: 90%
    height: 200px
    border-radius: 20px
    shadow-radius: 5px
    box-shadow: 2px 2px 2px
    shadow-color: gray
`
const ImageContainer = styled.View`
    height: 100%
`
const CardBackgroundImage = styled(Image)`
    flex: 1
    border-radius: 20px

`
const PropertyLabel = styled.Text`
    position: absolute
    width: 100%
    background-color: rgba(0, 0, 0, 0.5)
    color: white
    bottom: 20px
    font-size: ${props => props.theme.fontSizes.medium}
`

export const PropertyItem = ({ propertyInfo, navigation, currentRegion }) => {
    console.log(currentRegion + ' propertyItem')
    const goToDetailScreen = () => {
        navigation.navigate( 'Detail', {
            propertyInfo, currentRegion
        })
    }

    return (
        <Wrapper>
            <PropertyCard  onPress={goToDetailScreen} >
                <ImageContainer>
                    <CardBackgroundImage source={{ uri: propertyInfo.imageUri }} />
                    <PropertyLabel>{propertyInfo.name}</PropertyLabel>
                </ImageContainer>
                
            </PropertyCard>
        </Wrapper>
    )
}