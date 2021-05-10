import React, { useState, useContext, useEffect } from 'react'
import { View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import { TextInput, Button, Switch } from 'react-native-paper'
import styled from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'
import { Select, SelectItem, Text, IndexPath, Card } from '@ui-kitten/components'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import { theme } from '../../../infrastructure/theme'
import { RealEstateContext } from '../../../services/realestate/properties.context'

const ScreenWrapper = styled(SafeAreaView)`
    flex: 1
`
const HeadingWrapper = styled.View`
    height: 50px
    width: 100%
    justify-content: center
    align-items: center
`
const HeadingTextWrapper = styled.View`
    flex-direction: column
`
const Heading = styled.Text`
    font-size: ${props => props.theme.fontSizes.xLarge}
`

const BackButton = styled(TouchableOpacity)`
    padding-left: 5px
    position: absolute
    left: 0px
`
const SelectView = styled.View`
    margin: 10px
    width: 90%
    border-width: 0.5px
    border-radius: 5px
`
const NotesInput = styled(TextInput).attrs({
    theme: {colors: {primary: theme.colors.ui.primary}}
})`
    background-color: white
    margin-left: 10px
    margin-right: 10px
    width: 90%
    color: green
    height: 100px
`
const CustomCard = styled.View`
    width: 90%
    margin: 10px
    flex-direction: row
    background-color: white
    justify-content: center
    align-items: flex-end
    padding-bottom: 20px
    border-radius: 5px
    border-width: 0.5px
`
const MediumText = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
`
const TotalCostInput = styled(TextInput).attrs({
    theme: {colors: {primary: theme.colors.ui.primary}}
})`
    background-color: white
`
const ItemWrapper = styled.View`
    width: 40%
`
const ImageWrapper = styled.View`
    width: 90%
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
const ButtonComponent = styled(Button).attrs({
    color: theme.colors.ui.secondary
})`
    align-self: center
    margin: 20px
`
const ThirdPartyCard = styled.View`
    width: 90%
    margin: 10px
    background-color: white
    align-items: center
    padding: 20px
    border-radius: 5px
    border-width: 0.5px
`
const SwitchView = styled.View`
    flex-direction: row
    padding: 10px
    width: 100%
    justify-content: space-between
`

export const AddWorkOrderScreen = ({ navigation, route }) => {
    const [selectedIndexTypes, setSelectedIndexTypes] = useState(new IndexPath(0))
    const [selectedIndexAreas, setSelectedIndexAreas] = useState(new IndexPath(0))
    const [thirdPartySelected, setThirdPartySelected] = useState(false)
    const { addWorkOrder } = useContext(RealEstateContext)
    const { propertyName } = route.params
    const [workOrder, setWorkOrder] = useState({
        propertyName: propertyName,
        type: '',
        area: '',
        notes: '',
        totalCost: '',
        imageUri: '',
        thirdPartyInfo: ''
    })
    const [types, setTypes] = useState([
        'general',
        'electrical',
        'floor',
        'ceiling',
        'wall',
        'plumbing',
        'fence',
        'appliance',
        'fixture'
    ])
    const [areas, setAreas] = useState([
        'common area',
        'kitchen',
        'bathroom',
        'yard',
        'bedroom',
        'porch',
        'dining room',
        'attic',
        'basement',
        'crawlspace',
        'roof',
        'utility room'
    ])

    // useEffect(() => {
    //     console.log(propertyName)
    //     setWorkOrder(prevState =>  ({...prevState, propertyName: propertyName}))
    //     // if (propertyName) {
    //     //     console.log('useEffect2')
    //     //     setWorkOrder({...workOrder, propertyName: 'propertyName'})
    //     // }
    //     console.log(workOrder)
    // }, [])
    useEffect(() => {
        setWorkOrder({ ...workOrder, type: types[selectedIndexTypes.row], area: areas[selectedIndexAreas.row]})
    }, [selectedIndexTypes, selectedIndexAreas])

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
        setWorkOrder(prevState =>  ({...prevState, imageUri: image.uri}) )
    }

    const saveWorkOrder = () => {
        addWorkOrder(workOrder)
        //need to connect to the context API. And change the 'setWorkOrder' above to another place to avoid react batching.
        navigation.goBack()
    }

    return (

        <ScreenWrapper>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} >
            <ScrollView style={{ width: '100%'}} contentContainerStyle={{ alignItems: 'center'}}>

            <HeadingWrapper>
                <BackButton onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={40} color="black" />
                </BackButton>
                <HeadingTextWrapper>
                    <Heading>Add Work Order</Heading>
                </HeadingTextWrapper>
            </HeadingWrapper>

            <SelectView>
                <Select
                    value={types[selectedIndexTypes.row]}
                    selectedIndex={selectedIndexTypes}
                    onSelect={index => setSelectedIndexTypes(index)}
                    size='medium'
                >
                    {types.map((name, i) => <SelectItem title={<Text>{name}</Text>} key={i}/> )}
                </Select>
            </SelectView>
            <SelectView>
                <Select
                    value={areas[selectedIndexAreas.row]}
                    selectedIndex={selectedIndexAreas}
                    onSelect={index => setSelectedIndexAreas(index)}
                    size='medium'
                >
                    {areas.map((name, i) => <SelectItem title={<Text>{name}</Text>} key={i}/> )}
                </Select>
            </SelectView>

            <NotesInput 
                label='Notes'
                value={workOrder.notes}
                onChangeText={(t) => setWorkOrder(prevState =>  ({...prevState, notes: t}) )}
                mode='outlined'
                multiline
            />
            <CustomCard>
                <ItemWrapper>
                    <MediumText>Total cost: $</MediumText>
                </ItemWrapper>
                <ItemWrapper>
                    <TotalCostInput 
                        label='Cost' 
                        value={workOrder.totalCost}
                        onChange={event => setWorkOrder(prevState =>  ({...prevState, totalCost: event.nativeEvent.text}) )}
                        mode='flat'
                        keyboardType='numeric'
                    />
                </ItemWrapper>
            </CustomCard>

            <ImageWrapper>
                {!workOrder.imageUri 
                    ? <ButtonComponent onPress={takeImageHandler} icon='camera' mode='contained'>Take Picture</ButtonComponent>
                    : <ImagePreview source={{ uri: workOrder.imageUri }} />
                }
            </ImageWrapper>

            <ThirdPartyCard>
                <SwitchView>
                    <MediumText>Third Party</MediumText>
                    <Switch value={thirdPartySelected} onValueChange={() => setThirdPartySelected(!thirdPartySelected)} color={theme.colors.ui.primary} />
                </SwitchView>
                {thirdPartySelected
                    ? <NotesInput 
                        label='Enter info here...'
                        value={workOrder.thirdPartyInfo}
                        onChangeText={(t) => setWorkOrder(prevState =>  ({...prevState, thirdPartyInfo: t}) )}
                        mode='outlined'
                        multiline
                    />
                    : null
                }
            </ThirdPartyCard>

            <ButtonComponent onPress={saveWorkOrder} mode='contained' icon='content-save'>Save Work Order</ButtonComponent>

            </ScrollView>
        </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}