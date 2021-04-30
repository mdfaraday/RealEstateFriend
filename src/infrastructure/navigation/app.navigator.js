import React, { useRef, useMemo, useCallback } from "react";
import { View, StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'

import { ExpensesScreen } from '../../features/properties/screens/ExpensesScreen'
import { MenuScreen } from '../../features/properties/screens/MenuScreen'
import { PropertyNavigator } from './property.navigator'
import { colors } from '../../infrastructure/theme/colors'

const Tabs = createBottomTabNavigator()

const TAB_ICONS = {
    Main: 'home',
    Expenses: 'cash',
    Menu: 'menu'
}

const customScreenOptions = ({ route }) => {
    const iconName = TAB_ICONS[route.name]
    return {
        tabBarIcon: ({ size, color}) => (
            <Ionicons name={iconName} size={size} color={color} />
        )
    }
}

export const AppNavigator = () => {
    return (
        <Tabs.Navigator
            screenOptions={customScreenOptions}
            tabBarOptions={{
                activeTintColor: colors.ui.primary,
                inactiveTintColor: colors.ui.secondary
            }}
        >
            <Tabs.Screen name='Main' component={PropertyNavigator} />
            <Tabs.Screen name='Expenses' component={ExpensesScreen} />
            <Tabs.Screen name='Menu' component={MenuScreen} />
        </Tabs.Navigator>
    )
}