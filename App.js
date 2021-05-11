import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import { Navigation } from './src/infrastructure/navigation'
import { theme } from './src/infrastructure/theme'
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context'
import { RealEstateContextProvider } from './src/services/realestate/properties.context';
import { initRegions } from './src/services/realestate/properties.service'


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAaHEZtRVb8xNDY0hWnF5ECmDvAesiEmI",
  authDomain: "realestatefriend-27c75.firebaseapp.com",
  projectId: "realestatefriend-27c75",
  storageBucket: "realestatefriend-27c75.appspot.com",
  messagingSenderId: "284274339638",
  appId: "1:284274339638:web:90cde99c4eb19885c28d97",
  measurementId: "G-5HNPJ2ZTSE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

initRegions()
  .then(() => {
    console.log(('initialized db'))
  })
  .catch(err => {
    console.log('Initializing failed.')
    console.log(err)
  })

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
    'roboto-black-italic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
    'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'roboto-light-italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    'roboto-bold-italic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'roboto-medium-italic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'roboto-thin-italic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {setFontLoaded(true)}} onError={console.warn}/>
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <RealEstateContextProvider>
            <ApplicationProvider {...eva} theme={eva.light}>
              <Navigation />
            </ApplicationProvider>
          </RealEstateContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>

      <StatusBar />
    </>
  );
}
