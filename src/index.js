// @flow

import { Provider } from 'react-redux'
import store from './store'
import React from 'react'
import { render } from 'react-dom'
import Checkwist from './checkwist'
import firebase from './firebase/config'
import { FIREBASE_DEV, FIREBASE_PROD } from './firebase/config'

const config =
  process.env.NODE_ENV === 'development' ? FIREBASE_DEV : FIREBASE_PROD

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

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
