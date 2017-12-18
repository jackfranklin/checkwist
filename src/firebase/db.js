// @flow

import firebase from 'firebase'

export const writeUserData = (
  userId: string,
  displayName: ?string,
  imageUrl: ?string
) =>
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      displayName: displayName || 'No display name',
      imageUrl: imageUrl || 'placeholder.png',
    })
    .catch(error => console.log('firebase error', error))
