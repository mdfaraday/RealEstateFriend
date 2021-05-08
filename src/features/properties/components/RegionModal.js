import React, { useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    Keyboard, 
    ScrollView } from 'react-native'
import { Modal, Portal, TextInput } from 'react-native-paper'
import styled from 'styled-components/native'

const DEVICE_WIDTH = Dimensions.get('window').width

const Header = styled.View`
    height: 15%
    border-bottom-width: 0px
`
const HeaderText = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
    text-align: center
    padding: 10px
`
const ButtonContainer = styled.View`
    width: 100%
    flex-direction: row
`
const SaveButtonContainer = styled(TouchableOpacity)`
    width: 50%
`
const CancelButtonContainer = styled(TouchableOpacity)`
    width: 50%
`
// height: 10%
//     justify-content: center
//     border-bottom-left-radius: 20px
//     border-bottom-right-radius: 20px
const SaveButton = styled.Text`
    text-align: center
    font-size: 20px
    color: blue
`
const CancelButton = styled.Text`
    text-align: center
    font-size: 20px
    color: red
`

const AddRegionModal = styled(Modal)``
const NameInput = styled(TextInput)`
    width: 300px
    margin-top: 20px
    margin-bottom: 40px
    border-color: black
`

export const RegionModal = ({ closeModal, visible, dismiss }) => {
    const [enteredName, setEnteredName] = useState('')

    const containerStyle = {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white', 
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20
    }

    const cancelInput = () => {
        setEnteredName('')
        dismiss()
    }

    return (
        <Portal>
            <AddRegionModal visible={visible} onDismiss={cancelInput} contentContainerStyle={containerStyle}>
                <HeaderText>Name your new Region</HeaderText>
                <NameInput 
                    label='Name'
                    value={enteredName}
                    onChangeText={t => setEnteredName(t)}
                />
                <ButtonContainer>
                    <CancelButtonContainer onPress={dismiss}>
                        <CancelButton>Cancel</CancelButton>
                    </CancelButtonContainer>
                    <SaveButtonContainer onPress={() => closeModal(enteredName)}>
                        <SaveButton>Save</SaveButton>
                    </SaveButtonContainer>
                </ButtonContainer>
            </AddRegionModal>
        </Portal>
    )
}