import React, { useContext } from 'react'
import { View, Text, Button, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { Card, Paragraph } from 'react-native-paper'

import { RealEstateContext } from '../../../services/realestate/properties.context'

const ScreenWrapper = styled(SafeAreaView)`
    flex: 1
`
const Title = styled.Text`
    font-size: ${props => props.theme.fontSizes.xLarge}
    align-self: center
    margin: 20px
`
const HeadingWrapper = styled.View`
    height: 50px
    flex-direction: row
    justify-content: space-between
`
const HeadingTextWrapper = styled.View`
    flex-direction: column
`
const Heading = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
`
const HeadingSubtitle = styled.Text`
    font-size: ${props => props.theme.fontSizes.extraSmall}
    color: gray
    align-self: center
`
const BackButton = styled(TouchableOpacity)`
    padding-left: 5px
`
const MenuButton = styled(TouchableOpacity)`
    padding-right: 5px
`
const InfoOverlayContainer = styled.View`
    position: absolute
    background-color: rgba(255, 255, 255, 0.8)
    width: 100%
    padding: 5px
    bottom: 0px
`
const PropertyOverlayInfo = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
    padding: 3px
`
const MainBody = styled.View`
    align-items: center
    
`
const ImageContainer = styled.View`
    width: 100%
    height: 200px
`
const ImageComponent = styled(Image)`
    flex: 1
`
const InfoCard = styled.View`
    width: 95%
    flex-direction: row
    justify-content: space-around
    background-color: white
    margin-top: 10px
    padding: 10px
    shadow-radius: 5px
    box-shadow: 2px 2px 2px
    shadow-color: gray
    border-radius: 5px
`
const FirstColumn = styled.View``
const SecondColumn = styled.View``
const InfoText = styled.Text`
    font-size: ${props => props.theme.fontSizes.small}
    padding: 5px
`
const DescriptionCard = styled.View`
    width: 95%
    background-color: white
    margin-top: 10px
    padding: 10px
    shadow-radius: 5px
    box-shadow: 2px 2px 2px
    shadow-color: gray
    border-radius: 5px
`
const DescriptionText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
`
const DeleteButton = styled(TouchableOpacity)`
    width: 95%
    background-color: red
    border-radius: 20px
    margin: 10px
`
const DeleteText = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
    color: white
    padding: 15px
    align-self: center
`

//this screen accessed from 'PropertyItem.js'
export const PropertyDetailScreen = ({ navigation, route }) => {
    const { propertyInfo, currentRegion } = route.params
    const { deleteProperty } = useContext(RealEstateContext)

    const deletePropertyHandler = () => {
        deleteProperty(propertyInfo.regionName, propertyInfo.propertyName)
        navigation.navigate('Main')
    }

    return (
        <ScreenWrapper>
            <HeadingWrapper>
                <BackButton onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={40} color="black" />
                </BackButton>
                <HeadingTextWrapper>
                    <Heading>{propertyInfo.propertyName}</Heading>
                    <HeadingSubtitle>{currentRegion}</HeadingSubtitle>
                </HeadingTextWrapper>
                <MenuButton>
                    <Ionicons name='menu' size={40} color='black' />
                </MenuButton>
            </HeadingWrapper>

            <ScrollView>
                <MainBody>
                    <ImageContainer>
                        <ImageComponent source={{ uri: propertyInfo.imageUri }} />
                        <InfoOverlayContainer>
                            <PropertyOverlayInfo>{propertyInfo.bedrooms} Bed, {propertyInfo.bathrooms} Bath</PropertyOverlayInfo>
                            <PropertyOverlayInfo>{propertyInfo.address}</PropertyOverlayInfo>
                        </InfoOverlayContainer>
                    </ImageContainer>
                    
                    <InfoCard>
                        <FirstColumn>
                            <InfoText>Purchase cost: ${propertyInfo.purchaseCost}</InfoText>
                            <InfoText>Rehab cost: ${propertyInfo.rehabCost}</InfoText>
                            <InfoText>Monthly cost: ${propertyInfo.monthlyCost}</InfoText>
                            <InfoText>Maint cost: ${propertyInfo.maintCost}</InfoText>
                            <InfoText>Bedrooms: {propertyInfo.bedrooms}</InfoText>
                        </FirstColumn>
                        <SecondColumn>
                            <InfoText>Monthly rent: ${propertyInfo.monthlyRent}</InfoText>
                            <InfoText>Reserve Amt: ${propertyInfo.reserveAmt}</InfoText>
                            <InfoText>Sqft: {propertyInfo.sqft}</InfoText>
                            <InfoText>Acres: {propertyInfo.acres}</InfoText>
                            <InfoText>Bathrooms: {propertyInfo.bathrooms}</InfoText>
                        </SecondColumn>
                    </InfoCard>
                        
                    <DescriptionCard>
                        <DescriptionText>{propertyInfo.description}</DescriptionText>
                    </DescriptionCard>
                    <DeleteButton onPress={deletePropertyHandler} >
                        <DeleteText>Delete Property</DeleteText>
                    </DeleteButton>
                </MainBody>
            </ScrollView>
        </ScreenWrapper>
    )
}