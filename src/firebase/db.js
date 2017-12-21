// @flow

import firebase from 'firebase'

const getUserData = (userId: string) =>
  firebase
    .database()
    .ref(`/users/${userId}`)
    .once('value')
    .then(snapshot => (snapshot ? snapshot.val() : undefined))

export const writeUserDataIfNewUser = (
  userId: string,
  displayName: ?string,
  imageUrl: ?string
) => {
  return getUserData(userId).then(user => {
    return user
      ? user
      : firebase
          .database()
          .ref('users/' + userId)
          .set({
            displayName: displayName || 'No display name',
            imageUrl: imageUrl || 'placeholder.png',
          })
          .catch(error => console.log('firebase error', error))
  })
}

export const fetchUserTemplates = (userId, cb) =>
  firebase
    .database()
    .ref(`users/${userId}`)
    .on('value', cb)
