import React, { useContext, useRef, useMemo, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { List, Button } from 'react-native-paper'
// import BottomSheet from '@gorhom/bottom-sheet'
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
// import RBSheet from "react-native-raw-bottom-sheet"

import { AuthenticationContext } from '../../../services/authentication/authentication.context'
import { theme } from '../../../infrastructure/theme'

const SettingsItem = styled.View`

`

const SettingsContainer = styled.View`
    flex: 1
    align-items: center
    justify-content: center
`

export const MenuScreen =() => {
    const { onLogout } = useContext(AuthenticationContext)

    return (        
        <SettingsContainer>
            <Button icon='door-open' color={theme.colors.ui.primary} mode='contained' onPress={onLogout}>
                Logout
            </Button>
        </SettingsContainer>
    )
}
