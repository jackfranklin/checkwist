// @flow
import React, { Component } from 'react'
import { getAuthState, signUserIn, isLoggedInAnd } from './firebase/auth'
import { writeUserData } from './firebase/db'

type Props = {}
type State = { user: ?$npm$firebase$auth$User }

class Checkwist extends Component<Props, State> {
  state = {
    user: undefined,
  }

  componentDidMount() {
    getAuthState(user => {
      this.setState({ user })
    })
  }

  login = () => {
    getAuthState(user => {
      if (!user) {
        signUserIn().then(() =>
          isLoggedInAnd(user => {
            this.setState({ user })
            writeUserData(user.uid, user.displayName, user.photoURL)
          })
        )
      }
    })
  }

  render() {
    return this.state.user ? (
      <p>you are logged in!</p>
    ) : (
      <div>
        <button onClick={this.login}>Click here to login</button>
      </div>
    )
  }
}

export default Checkwist
