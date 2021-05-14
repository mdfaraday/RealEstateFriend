import React, { useRef, useState, useContext, useEffect } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { List, Divider, Modal, Portal, Provider } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet"
import { FontAwesome5 } from '@expo/vector-icons'
import styled from 'styled-components/native'

import { ScreenWrapper, NoPropertiesView, NoPropertiesTextWrapper, NoPropertiesText, ActionButton, SheetListItem, SheetListItemTitle, 
        RegionListContainer, PropertyListContainer, ContainerForAllProperties } from '../components/main.styles'
import { RealEstateContext } from '../../../services/realestate/properties.context'
import { RegionModal } from '../components/RegionModal'
import { RegionCard } from '../components/RegionCard'
import { DisplayPropertyList } from '../components/DisplayPropertyList'
import { theme } from '../../../infrastructure/theme'

export const MainScreen = ({ navigation }) => {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [indexOfRegion, setIndexOfRegion] = useState(0)
    //const [enteringNewRegion, setEnteringNewRegion] = useState(false)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const refRBSheet = useRef() //it's possible to setup the bottom sheet in another screen and pass the 'ref' using the special syntax for it.
    const { propertiesData, addRegion, loadProperties, deleteRegion, hardDataReset, tempDeleteSpecificRegions } = useContext(RealEstateContext)

    useEffect(() => {
        initialLoad()
        //hardDataReset()
    }, [selectedRegion])
    //console.log(propertiesData)
    const initialLoad = async () => {
        await loadProperties()
    }

    const saveRegion = (name) => {
        addRegion(name)
        setModalIsVisible(false)
    }
    const removeRegionByName = (name) => {
        deleteRegion(name)
    }
    const dismissModal = () => {
        setModalIsVisible(false)
    }
    const loadRegionModal = () => {
        refRBSheet.current.close()
        setModalIsVisible(true)
    }
    const loadAddPropertyScreen = () => {
        refRBSheet.current.close()
        //navigation.navigate('AddProperty')
        navigation.navigate( 'AddProperty', { region: selectedRegion })
    }
    //from RegionCard under components
    const regionSelectedHandler = (currentRegionSelected, index) => {
        console.log(currentRegionSelected + ' regionSelectedHandler')
        setIndexOfRegion(index)
        setSelectedRegion(currentRegionSelected)
    }

    return (
        <Provider>
        <ScreenWrapper>
            {propertiesData.length > 0 
                ? (
                    <ContainerForAllProperties>
                        <RegionListContainer>
                            <FlatList 
                                data={propertiesData} 
                                horizontal
                                keyExtractor={() => (Math.random() * 1).toString()} 
                                renderItem={({ item }) => (
                                    <RegionCard regionTitle={item.regionName} deleteRegionByName={removeRegionByName} regionSelected={regionSelectedHandler} fullDataList={propertiesData} />
                                )}
                            />
                        </RegionListContainer>
                        <PropertyListContainer>
                            { selectedRegion 
                                ? <DisplayPropertyList fullDataList={propertiesData[indexOfRegion].properties} navigation={navigation} currentRegion={selectedRegion} /> 
                                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{ fontSize: 20}}>No properties yet</Text></View>
                            }
                        </PropertyListContainer>
                    </ContainerForAllProperties>
                ) : (
                <NoPropertiesView>
                    <FontAwesome name="home" size={200} color={theme.colors.ui.secondary} />
                    <NoPropertiesTextWrapper>
        <Button title='delete' onPress={() => tempDeleteSpecificRegions('')} />
                        <NoPropertiesText>You don't have any properties yet.</NoPropertiesText>
                        <NoPropertiesText>Click the menu button to start adding</NoPropertiesText>
                        <NoPropertiesText>Make some money</NoPropertiesText>
                    </NoPropertiesTextWrapper>
                    <MaterialIcons name="attach-money" size={80} color={theme.colors.ui.primary} />
                </NoPropertiesView>
            )}

            <ActionButton
                icon="plus"
                onPress={() => refRBSheet.current.open()}
            />
            <RBSheet
                ref={refRBSheet}
                height={200}
                openDuration={200}
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
                        width: '90%'
                    }
                  }}
            >
                <SheetListItem onPress={loadRegionModal}>
                    <FontAwesome5 name="map-marked-alt" size={36} color="green" />
                    <SheetListItemTitle>Add New Region</SheetListItemTitle>
                </SheetListItem>
                <Divider />
                <SheetListItem onPress={loadAddPropertyScreen}>
                    <FontAwesome name="home" size={42} color="green" />
                    <SheetListItemTitle>Add New Property</SheetListItemTitle>
                </SheetListItem>
                <Divider />
            </RBSheet>
            
            <RegionModal visible={modalIsVisible} dismiss={dismissModal} closeModal={saveRegion} />
            
        </ScreenWrapper>
        </Provider>
    )
}