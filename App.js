import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'

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

export default function App() {
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
