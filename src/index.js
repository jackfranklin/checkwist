// @flow

import { Provider } from 'react-redux'
import store from './store'
import React from 'react'
import { render } from 'react-dom'
import Checkwist from './checkwist'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCvSLfAPLQzoLG6BMXQSLcFfwuTrf10TGk',
  authDomain: 'checkwist-dev.firebaseapp.com',
  databaseURL: 'https://checkwist-dev.firebaseio.com',
  projectId: 'checkwist-dev',
  storageBucket: 'checkwist-dev.appspot.com',
  messagingSenderId: '219076333696',
}
firebase.initializeApp(config)

const App = () => (
  <Provider store={store}>
    <Checkwist />
  </Provider>
)

const elem = document.getElementById('react-root')
if (elem) {
  render(<App />, elem)
} else {
  throw new Error('No react root found')
}
