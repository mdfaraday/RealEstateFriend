import styled from 'styled-components/native'
import { TextInput, Button } from 'react-native-paper'
import { colors } from '../../../infrastructure/theme/colors'
import { theme } from '../../../infrastructure/theme'
import { ThemeContext } from 'styled-components'

export const LoginBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/house_bg.jpg')
})`
    flex: 1
    align-items: center
    justify-content: center
`

export const LoginCover = styled.View`
    position: absolute
    width: 100%
    height: 100%
    background-color: rgba(255, 255, 255, 0.2)
`

export const LoginContainer = styled.View`
    background-color: rgba(255, 255, 255, 1)
    padding: ${(props) => props.theme.space[3]}
    margin-top: ${(props) => props.theme.space[2]}
`

export const AuthButton = styled(Button).attrs({
    color: colors.ui.primary //theme is not available when we set attributes like this, so we had to import { colors } to do this. 
})`
    padding: 20px
`//padding: ${(props) => props.theme.space[2]}

export const Title = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.xLarge}
`

export const AuthInput = styled(TextInput)`
    width: 300px
    margin-bottom: 10px
`

export const ButtonText = styled.Text`
    font-size: ${props => props.theme.fontSizes.medium}
`