import React, { useContext, useRef } from 'react'
import { View, Text, Button, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Card, Paragraph, Divider } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import RBSheet from "react-native-raw-bottom-sheet"

import { RealEstateContext } from '../../../services/realestate/properties.context'
import { theme } from '../../../infrastructure/theme'

const ScreenWrapper = styled(SafeAreaView)`
    flex: 1
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
const DetailCard = styled.View`
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

const SheetListItem = styled.TouchableOpacity`
    flex-direction: row
    justify-content: center
    align-items: center
    margin-top: 20px
    margin-bottom: 30px
`

const SheetListItemTitle = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
    padding-left: 40px
`
const WOTitle = styled.Text`
    font-size: ${props => props.theme.fontSizes.xLarge}
    margin: 20px
`
const SpacerLine = styled.View`
    background-color: black
    height: 3px
    width: 80%
    margin-top: 20px
    margin-bottom: 10px
`
const WOidWrapper = styled.View`
    align-items: flex-start
`
const IdText = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
`
const CategoryWrapper = styled.View`
    flex-direction: row
    justify-content: space-between
    width: 100%
    margin-top: 10px
    margin-bottom: 10px
`
const CategoryText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
`
const WONotesWrapper = styled.View`
    width: 100%
    border-width: 0.5px
    align-self: center
    margin: 10px
    padding: 5px
    minHeight: 50px
`
const NotesText = styled.Text`
    font-size: ${props => props.theme.fontSizes.small}
`
const WOImageWrapper = styled.View`
    width: 100%
    border-width: 0.5px
    align-self: center
    margin: 10px
`
const ThirdPartyWrapper = styled.View`
    width: 100%
    border-width: 0.5px
    align-self: center
    margin: 10px
    padding: 5px
`
const ThirdPartyText = styled.Text`
    font-size: ${props => props.theme.fontSizes.small}
`
const BottomRowWrapper = styled.View`
    flex-direction: row
    justify-content: space-between
    width: 100%
    margin-top: 10px
`
const DeleteButton = styled(TouchableOpacity)``
const TotalCostText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
`

//this screen accessed from 'PropertyItem.js'
export const PropertyDetailScreen = ({ navigation, route }) => {
    const { propertyInfo, currentRegion, workOrderInfo } = route.params
    const { deleteProperty, deleteWorkOrder } = useContext(RealEstateContext)
    const refRBSheet = useRef()

    const deletePropertyHandler = () => {
        deleteProperty(propertyInfo.regionName, propertyInfo.propertyName)
        navigation.navigate('Main')
    }
    const addWorkOrderHandler = () => {
        refRBSheet.current.close()
        navigation.navigate('AddWorkOrder', {propertyName: propertyInfo.propertyName})
    }
    const deleteWorkOrderHandler = (WOid) => {
        deleteWorkOrder(propertyInfo.propertyName, WOid)
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
                <MenuButton onPress={() => refRBSheet.current.open()}>
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
                            <InfoText>Down Payment: {propertyInfo.downPayment}</InfoText>
                            <InfoText>Rehab cost: ${propertyInfo.rehabCost}</InfoText>
                            <InfoText>Mortgage cost: ${propertyInfo.monthlyCost}</InfoText>
                            <InfoText>Maint cost: ${propertyInfo.maintCost}</InfoText>
                            <InfoText>Bedrooms: {propertyInfo.bedrooms}</InfoText>
                        </FirstColumn>
                        <SecondColumn>
                            <InfoText>Monthly rent: ${propertyInfo.monthlyRent}</InfoText>
                            <InfoText>Debt Remaining: {propertyInfo.debtRemaining}</InfoText>
                            <InfoText>Reserve Amt: ${propertyInfo.reserveAmt}</InfoText>
                            <InfoText>Sqft: {propertyInfo.sqft}</InfoText>
                            <InfoText>Acres: {propertyInfo.acres}</InfoText>
                            <InfoText>Bathrooms: {propertyInfo.bathrooms}</InfoText>
                        </SecondColumn>
                    </InfoCard>
                        
                    <DetailCard>
                        <DescriptionText>{propertyInfo.description}</DescriptionText>
                    </DetailCard>
                    {/* <WOTitle>Work Orders</WOTitle> */}
                    <SpacerLine></SpacerLine>

                    {workOrderInfo.length > 0
                        ? workOrderInfo.map(wo => (
                            <DetailCard>
                                <WOidWrapper>
                                    <IdText>{wo.id}</IdText>
                                </WOidWrapper>
                                <CategoryWrapper>
                                    <CategoryText>Type: {wo.type}</CategoryText>
                                    <CategoryText>Area: {wo.area}</CategoryText>
                                </CategoryWrapper>
                                <WONotesWrapper>
                                    <NotesText>{wo.notes}</NotesText>
                                </WONotesWrapper>
                                {wo.imageUri !== ""
                                    ? <WOImageWrapper>
                                        <ImageComponent source={{ uri: wo.imageUri }} />
                                    </WOImageWrapper>
                                    : null }
                                {wo.thirdPartyInfo !== ""
                                    ? <ThirdPartyWrapper>
                                        <ThirdPartyText>{wo.thirdPartyInfo}</ThirdPartyText>
                                    </ThirdPartyWrapper>
                                    : null }
                                    <BottomRowWrapper>
                                        <DeleteButton onPress={() => deleteWorkOrderHandler(wo.id)}>
                                            <AntDesign name="delete" size={24} color="red" />
                                        </DeleteButton>
                                        <TotalCostText>Total cost: ${wo.totalCost}</TotalCostText>
                                    </BottomRowWrapper>
                            </DetailCard>
                        ))
                        : null
                    }

            <RBSheet
                ref={refRBSheet}
                height={200}
                openDuration={200}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    draggableIcon: {
                      backgroundColor: theme.colors.ui.secondary
                    },
                    wrapper: {
                        alignItems: 'center'
                    },
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        width: '90%'
                    }
                  }}
            >
                <SheetListItem onPress={addWorkOrderHandler}>
                    <MaterialCommunityIcons name="hammer-wrench" size={36} color={theme.colors.ui.primary} />
                    <SheetListItemTitle>Add Work Order</SheetListItemTitle>
                </SheetListItem>
                <Divider />
                <SheetListItem onPress={deletePropertyHandler}>
                    <AntDesign name="delete" size={36} color="red" />
                    <SheetListItemTitle>Delete Property</SheetListItemTitle>
                </SheetListItem>
                <Divider />
            </RBSheet>
                    
                </MainBody>
            </ScrollView>
        </ScreenWrapper>
    )
}