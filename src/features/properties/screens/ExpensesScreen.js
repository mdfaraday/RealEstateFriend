import React, { useState, useContext, useEffect } from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Menu, Divider, Button, Provider, Segment, Container } from 'react-native-paper'
import styled from 'styled-components/native'
import { Select, SelectItem, Text, IndexPath, Card } from '@ui-kitten/components'
import { Fontisto } from '@expo/vector-icons'
//local imports
import { theme } from '../../../infrastructure/theme'
import { RealEstateContext } from '../../../services/realestate/properties.context'

const ScreenWrapper = styled(SafeAreaView)`
    flex: 1
    align-items: center
`
const HeadingWrapper = styled.View`
    height: 50px
    justify-content: center
    align-items: center
`
const HeadingTextWrapper = styled.View`
    flex-direction: row
`
const ButtonComponent = styled(Button).attrs({
    color: theme.colors.ui.secondary
})`
    width: 45%s
`
const SelectView = styled.View`
    margin: 10px
    width: 90%
`
const ExpenseText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
    padding: 5px
    font-family: roboto-regular
`
const CustomCard = styled(Card)`
    width: 90%
    margin-bottom: 10px
`
const TotalsView = styled.View`
    flex-direction: row
    justify-content: space-between
`
const SpacerView = styled.View`
    margin: 20px
`
const DividerComponent = styled(Divider)`
    margin: 5px
`
export const NoPropertiesView = styled.SafeAreaView`
    flex: 1
    justify-content: center
    align-items: center
`

export const NoPropertiesTextWrapper = styled.View`
    width: 80%
    align-items: center
    margin: 20px
`

export const NoPropertiesText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
    padding: 5px
    font-family: roboto-regular
`


export const ExpensesScreen = ({ navigation }) => {
    const [toggleExpensesByRegion, setToggleExpensesByRegion] = useState(false)
    const [state, setState] = useState(['item1', 'item2', 'item3'])
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalCashFlow, setTotalCashFlow] = useState(0)
    const [propertiesExist, setPropertiesExist] = useState(false)
    const { propertiesData } = useContext(RealEstateContext)
    //console.log(selectedIndex.row)
    //console.log(propertiesData[selectedIndex])

    useEffect(() => {
        propertiesCheck()
    }, [])

    useEffect(() => {
        calculateNumbers()
        //console.log('useEffect')
    }, [propertiesData, selectedIndex, toggleExpensesByRegion])

    const calculateNumbers = () => {
        let tempTotalIncome = 0
        let tempTotalExpenses = 0
        if (toggleExpensesByRegion && propertiesData[selectedIndex.row]) {
            //console.log('working')
            if (propertiesData[selectedIndex.row].properties.length > 0) {
                for (let i=0;i<propertiesData[selectedIndex.row].properties.length;i++) {
                    console.log('working 2')
                    tempTotalIncome += parseInt(propertiesData[selectedIndex.row].properties[i].monthlyRent)
                    tempTotalExpenses += parseInt(propertiesData[selectedIndex.row].properties[i].maintCost)
                    tempTotalExpenses += parseInt(propertiesData[selectedIndex.row].properties[i].reserveAmt)
                    tempTotalExpenses += parseInt(propertiesData[selectedIndex.row].properties[i].mortgageCost)
                }
            }
        } else {
            //console.log('total section')
            for (let i=0;i<propertiesData.length;i++) {
                for (let j=0;j<propertiesData[i].properties.length;j++) {
                    tempTotalIncome += parseInt(propertiesData[i].properties[j].monthlyRent)
                    tempTotalExpenses += parseInt(propertiesData[i].properties[j].maintCost)
                    tempTotalExpenses += parseInt(propertiesData[i].properties[j].reserveAmt)
                    tempTotalExpenses += parseInt(propertiesData[i].properties[j].mortgageCost)
                }
            }
        }
        //console.log(tempTotalIncome)
        setTotalIncome(tempTotalIncome)
        setTotalExpenses(tempTotalExpenses)
        setTotalCashFlow(tempTotalIncome - tempTotalExpenses)
    }
    const propertiesCheck = () => {
        if (propertiesData.length > 0) {
            for (let i=0;i<propertiesData.length;i++) {
                if (propertiesData[i].properties.length > 0) {
                    return setPropertiesExist(true)
                }
            }
        }
        return
    }

    if (propertiesExist) {
        return (
            <ScreenWrapper>
                <HeadingWrapper>
                    <HeadingTextWrapper>
                        <ButtonComponent onPress={() => setToggleExpensesByRegion(false)} mode={toggleExpensesByRegion ? 'outlined' : 'contained'}>Total</ButtonComponent>
                        <ButtonComponent onPress={() => setToggleExpensesByRegion(true)} mode={toggleExpensesByRegion ? 'contained' : 'outlined'}>By Region</ButtonComponent>
                    </HeadingTextWrapper>
                </HeadingWrapper>

                {toggleExpensesByRegion 
                ? <SelectView>
                    <Select
                        value={propertiesData[selectedIndex.row].regionName.replace(/_/g, " ")}
                        selectedIndex={selectedIndex}
                        onSelect={index => setSelectedIndex(index)}
                        size='large'
                    >
                        {propertiesData.map((region, i) => <SelectItem title={<Text>{region.regionName.replace(/_/g, " ")}</Text>} key={i}/> )}
                    </Select>
                </SelectView>
                : null }

                <CustomCard>
                    <TotalsView>
                        <ExpenseText>Total Monthly Income:</ExpenseText>
                        <ExpenseText>${totalIncome}</ExpenseText>
                    </TotalsView>
                    <TotalsView>
                        <ExpenseText>Total Monthly Expenses:</ExpenseText>
                        <ExpenseText>- ${totalExpenses}</ExpenseText>
                    </TotalsView>
                    <DividerComponent />
                    <TotalsView>
                        <ExpenseText>Total Cash Flow: </ExpenseText>
                        <ExpenseText>${totalCashFlow}</ExpenseText>
                    </TotalsView>
                    {!toggleExpensesByRegion ?
                        <>
                            <SpacerView></SpacerView>
                            <TotalsView>
                                <ExpenseText>Total Net Worth: </ExpenseText>
                                <ExpenseText>$1,000,000</ExpenseText>
                            </TotalsView>
                        </>
                        : null
                    }
                </CustomCard>
                
            <CustomCard>
                <ExpenseText>This is where work order info will go</ExpenseText>
            </CustomCard>
                
                
                
            </ScreenWrapper>
        )
    } else {
        return (
            <NoPropertiesView>
                <Fontisto name="island" size={200} color={theme.colors.ui.secondary} />
                <NoPropertiesTextWrapper>
                    <NoPropertiesText>You don't have any properties yet.</NoPropertiesText>
                    <NoPropertiesText>Go and conquer the world!</NoPropertiesText>
                </NoPropertiesTextWrapper>
            </NoPropertiesView>
            
        )
    }
}