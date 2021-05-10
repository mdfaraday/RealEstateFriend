import React, { useState, useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, keyboard } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import styled from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions' //now deprecated. Can get permissions through 'expo-camera'.

import { RealEstateContext } from '../../../services/realestate/properties.context'
import { theme } from '../../../infrastructure/theme'

const ScreenWrapper = styled(SafeAreaView)`
    flex: 1
    background-color: white
`
const Title = styled.Text`
    font-size: ${props => props.theme.fontSizes.xLarge}
    align-self: center
    margin: 20px
`
const ButtonComponent = styled(Button).attrs({
    color: theme.colors.ui.secondary
})`
    align-self: center
    margin: 20px
`
const ImageWrapper = styled.View`
    width: 100%
    height: 250px
    margin-top: 10px
    margin-bottom: 20px
    border: 1px solid black
    justify-content: center
`
const ImagePreview = styled(Image)`
    width: 100%
    height: 100%
`
const StyledInput = styled(TextInput).attrs({
    theme: {colors: {primary: theme.colors.ui.primary}}
})`
    background-color: white
    margin-left: 10px
    margin-right: 10px
    color: green
`
const DescriptionInput = styled(TextInput).attrs({
    theme: {colors: {primary: theme.colors.ui.primary}}
})`
    background-color: white
    margin-left: 10px
    margin-right: 10px
    color: green
    height: 100px
`
const FinancialDetailsWrapper = styled.View`
    flex: 1
    flex-direction: row
    justify-content: space-around
`
const FirstColumn = styled.View`
    width: 50%
`
const SecondColumn = styled.View`
    width: 50%
`

export const AddPropertyScreen = ({ navigation, route }) => {
    const [propertyState, setPropertyState] = useState({
        regionName: '',
        propertyName: '',
        imageUri: '',
        description: '',
        address: '',
        purchaseCost: '',
        rehabCost: '',
        mortgageCost:'',
        maintCost: '',
        monthlyRent: '',
        reserveAmt: '',
        sqft: '',
        acres: '',
        bedrooms: '',
        bathrooms: '',
        debtRemaining: '',
        downPayment: ''
    })
    const { region } = route.params
    const { addProperty } = useContext(RealEstateContext)

    useEffect(() => {
        setPropertyState(prevState => ({...prevState, regionName: region}))
    }, [])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA) //the '.CAMERA' means we are asking permission for using the 'camera'. Change that constant to ask other permissions.
        if (result.status !== 'granted') { //may need to ask permissions for both CAMERA and CAMERA_ROLL on some devices.
            Alert.alert('Insufficient permissions', 'You need to grant access to the camera to use this feature', [{ text: 'Okay' }])
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true, //if we added the 'base64' prop here it would be a very long text string that represents the image.
            aspect: [16, 9],
            quality: 0.5 //changes image size
        })
        setPropertyState(prevState =>  ({...prevState, imageUri: image.uri}) )
    }

    const saveProperty = () => {
        addProperty(propertyState)
        navigation.navigate('Main')        
    }

    return (
        <ScreenWrapper>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} onPress={() => keyboard.dismiss()}>
            <ScrollView>
        
                <Title>Add a property</Title>
                <StyledInput 
                    label='Name'
                    value={propertyState.propertyName}
                    onChangeText={(t) => setPropertyState(prevState =>  ({...prevState, propertyName: t}) )}
                />
                <ImageWrapper>
                    {!propertyState.imageUri 
                        ? <ButtonComponent onPress={takeImageHandler} icon='camera' mode='contained'>Take Picture</ButtonComponent>
                        : <ImagePreview source={{ uri: propertyState.imageUri }} />
                    }
                </ImageWrapper>
                <DescriptionInput 
                    label='description'
                    value={propertyState.description}
                    onChangeText={(t) => setPropertyState(prevState =>  ({...prevState, description: t}) )}
                    mode='outlined'
                    multiline
                />
                <StyledInput 
                    label='address'
                    value={propertyState.address}
                    onChangeText={(t) => setPropertyState(prevState =>  ({...prevState, address: t}) )}
                />
                <FinancialDetailsWrapper>
                    <FirstColumn>
                        <StyledInput 
                            label='Purchase cost'
                            value={propertyState.purchaseCost}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, purchaseCost: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Rehab cost'
                            value={propertyState.rehabCost}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, rehabCost: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Monthly cost'
                            value={propertyState.mortgageCost}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, mortgageCost: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Maint cost'
                            value={propertyState.maintCost}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, maintCost: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Bedrooms'
                            value={propertyState.bedrooms}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, bedrooms: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Debt Remaining'
                            value={propertyState.debtRemaining}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, debtRemaining: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                    </FirstColumn>
                    <SecondColumn>
                        <StyledInput 
                            label='Monthly rent'
                            value={propertyState.monthlyRent}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, monthlyRent: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Reserve Amt'
                            value={propertyState.reserveAmt}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, reserveAmt: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Sqft'
                            value={propertyState.sqft}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, sqft: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Acres'
                            value={propertyState.acres}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, acres: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Bathrooms'
                            value={propertyState.bathrooms}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, bathrooms: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                        <StyledInput 
                            label='Down Payment'
                            value={propertyState.downPayment}
                            keyboardType='numeric'
                            onChange={event => setPropertyState(prevState =>  ({...prevState, downPayment: event.nativeEvent.text}) )}
                            underlineColor='green'
                        />
                    </SecondColumn>
                </FinancialDetailsWrapper>
                
                <ButtonComponent onPress={saveProperty} mode='contained' icon='content-save'>Save Property</ButtonComponent>
            
            </ScrollView>
        </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}