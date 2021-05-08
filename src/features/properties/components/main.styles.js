import styled from 'styled-components/native'
import { FAB } from 'react-native-paper'
import { SafeAreaView } from 'react-native'

export const ScreenWrapper = styled.View`
    flex: 1
`

export const NoPropertiesView = styled.SafeAreaView`
    flex: 1
    justify-content: center
    align-items: center
`

export const NoPropertiesTextWrapper = styled.View`
    width: 80%
    align-items: center
`

export const NoPropertiesText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
`

export const ActionButton = styled(FAB)`
    position: absolute
    margin: 20px
    right: 0px
    bottom: 0px
    background-color: ${props => props.theme.colors.ui.secondary}
`

export const SheetListItem = styled.TouchableOpacity`
    flex-direction: row
    justify-content: center
    align-items: center
    margin-top: 30px
    margin-bottom: 30px
`

export const SheetListItemTitle = styled.Text`
    font-size: ${props => props.theme.fontSizes.large}
    padding-left: 40px
`

//containers for region and property lists.
export const ContainerForAllProperties = styled(SafeAreaView)`
    flex: 1
`
export const RegionListContainer = styled.View`
    height: 25%
    width: 100%
    border-bottom-width: 0.5px
`

export const PropertyListContainer = styled.View`
    height: 75%
    width: 100%
`