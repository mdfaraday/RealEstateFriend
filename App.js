import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase'

import { Navigation } from './src/infrastructure/navigation'
import { theme } from './src/infrastructure/theme'
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context'
import { RealEstateContextProvider } from './src/services/realestate/properties.context';

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

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <RealEstateContextProvider>
            <Navigation />
          </RealEstateContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>

      <StatusBar />
    </>
  );
}
