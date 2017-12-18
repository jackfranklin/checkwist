// @flow
import React, { Component } from 'react'
import firebase from 'firebase'
import { getAuthState, signUserIn, isLoggedInAnd } from './firebase/auth'
import { writeUserData } from './firebase/db'

type Props = {}

class Checkwist extends Component<Props> {
  componentDidMount() {
    getAuthState(user => {
      if (!user) {
        signUserIn().then(() =>
          isLoggedInAnd(user => {
            writeUserData(user.uid, user.displayName, user.photoURL)
          })
        )
      }
    })
  }
  render() {
    return <p>hello</p>
  }
}

export default Checkwist
