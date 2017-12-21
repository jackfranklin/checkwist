// @flow
import firebase from 'firebase'

export const signUserOut = () => firebase.auth().signOut()

export const getAuthState = (cb: (?$npm$firebase$auth$User) => void): void => {
  firebase.auth().onAuthStateChanged(cb)
}

export const isLoggedInAnd = (cb: $npm$firebase$auth$User => void): void => {
  getAuthState(user => (user ? cb(user) : undefined))
}

export const signUserIn = () => {
  const provider = new firebase.auth.TwitterAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => result.user)
    .catch(function(error) {
      console.log('there was totes an error', error)
    })
}
