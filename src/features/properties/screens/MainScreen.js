import React, { useRef, useState, useContext } from 'react'
import { View, Text, Modal } from 'react-native'
import { List, Divider } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet"
import { FontAwesome5 } from '@expo/vector-icons'
import styled from 'styled-components/native'

import { ScreenWrapper, NoPropertiesView, NoPropertiesTextWrapper, NoPropertiesText, ActionButton, SheetListItem, SheetListItemTitle } from '../components/main.styles'
import { RealEstateContext } from '../../../services/realestate/properties.context';
import { RegionModal } from '../components/RegionModal'

export const MainScreen = () => {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [regions, setRegions] = useState([])
    const refRBSheet = useRef()
    const { propertiesData, addRegion } = useContext(RealEstateContext)

    const saveRegion = (name) => {
        addRegion(name)
        setModalIsVisible(false)
    }

    const loadRegionModal = () => {
        refRBSheet.current.close()
        setModalIsVisible(true)
    }

    return (
        <ScreenWrapper>
            {propertiesData.length > 0 
                ? (
                    <Text>Hello there</Text>
                ) : (
                <NoPropertiesView>
                    <FontAwesome name="home" size={200} color="purple" />
                    <NoPropertiesTextWrapper>
                        <NoPropertiesText>You don't have any properties yet.</NoPropertiesText>
                        <NoPropertiesText>Click the menu button to start adding</NoPropertiesText>
                        <NoPropertiesText>Make some money</NoPropertiesText>
                        <MaterialIcons name="attach-money" size={80} color="green" />
                    </NoPropertiesTextWrapper>
                </NoPropertiesView>
            )}

            <ActionButton
                icon="plus"
                onPress={() => refRBSheet.current.open()}
            />
            <RBSheet
                ref={refRBSheet}
                height={260}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    draggableIcon: {
                      backgroundColor: "purple"
                    },
                    wrapper: {
                        alignItems: 'center'
                    },
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        width: '96%'
                    }
                  }}
            >
                <SheetListItem onPress={loadRegionModal}>
                    <FontAwesome5 name="map-marked-alt" size={36} color="green" />
                    <SheetListItemTitle>Add New Region</SheetListItemTitle>
                </SheetListItem>
                <Divider />
                <SheetListItem>
                    <FontAwesome name="home" size={42} color="green" />
                    <SheetListItemTitle>Add New Property</SheetListItemTitle>
                </SheetListItem>
                <Divider />
            </RBSheet>

            <Modal
                transparent={true}
                visible={modalIsVisible}
            >
                <RegionModal closeModal={saveRegion} />
            </Modal>
        </ScreenWrapper>
    )
}