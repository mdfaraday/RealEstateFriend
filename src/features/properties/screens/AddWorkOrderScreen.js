import React, { useState } from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'
import { Select, SelectItem, Text, IndexPath, Card } from '@ui-kitten/components'

const ScreenWrapper = styled(SafeAreaView)`
    flex: 1
`
const HeadingWrapper = styled.View`
    height: 50px
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
`

export const AddWorkOrderScreen = ({ navigation }) => {
    const [selectedIndexTypes, setSelectedIndexTypes] = useState(new IndexPath(0))
    const [selectedIndexAreas, setSelectedIndexAreas] = useState(new IndexPath(0))
    const [types, setTypes] = useState([
        'plumbing',
        'electrical',
        'Floor',
        'Ceiling',
        'Wall',
        'General',
        'Fence',
        'Appliance',
        'Fixture'
    ])
    const [areas, setAreas] = useState([
        'Yard',
        'kitchen',
        'bathroom',
        'Common area',
        'bedroom',
        'porch',
        'dining room',
        'attic',
        'basement',
        'crawlspace',
        'roof',
        'utility room'
    ])

    return (

        <ScreenWrapper>
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
            <Text>Work Orders</Text>
        </ScreenWrapper>
    )
}