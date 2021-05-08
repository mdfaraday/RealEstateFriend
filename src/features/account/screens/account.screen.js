import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AuthenticationContext } from '../../../services/authentication/authentication.context'

import { LoginBackground, ButtonText, Title, AuthInput, AuthButton, LoginCover, LoginContainer } from '../components/account.styles'
import { FadeInView } from '../../../components/animations/fade.animation'

export const AccountScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [authType, setAuthType] = useState('login')
    const { onLogin, isLoading, error } = useContext(AuthenticationContext)

    return (
        <LoginBackground>
            <LoginCover />
            <FadeInView>
                <LoginContainer>
                    <AuthInput
                        label='Email'
                        value={email}
                        textContentType='emailAddress' //this tells the phone what kind of text to expect (I imagine this is for auto-correct)
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(u) => setEmail(u)}
                    />
                    <AuthInput
                            label='Password'
                            value={password}
                            textContentType='password'
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={(p) => setPassword(p)}
                    />
                    <AuthButton
                        icon='lock-open-outline'
                        mode='contained'
                        onPress={() => onLogin(email, password)}
                        //style={styles.buttonStyle}
                    >
                        <ButtonText>Login</ButtonText>
                    </AuthButton>
                </LoginContainer>
            </FadeInView>
        </LoginBackground>
    )
}