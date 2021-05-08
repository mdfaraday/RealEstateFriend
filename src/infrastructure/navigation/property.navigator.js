import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import { MainScreen } from '../../features/properties/screens/MainScreen'
import { PropertyDetailScreen } from '../../features/properties/screens/PropertyDetailScreen'
import { AddPropertyScreen } from '../../features/properties/screens/AddPropertyScreen'

const Stack = createStackNavigator()

export const PropertyNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Detail' component={PropertyDetailScreen} />
        <Stack.Screen name='AddProperty' component={AddPropertyScreen} />
    </Stack.Navigator>
)