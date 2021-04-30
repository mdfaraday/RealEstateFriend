import React, { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationContext } from '../../services/authentication/authentication.context'
import { AppNavigator } from './app.navigator'
import { AccountScreen } from '../../features/account/screens/account.screen'

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext)

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AccountScreen /> }
        </NavigationContainer>
    )
}