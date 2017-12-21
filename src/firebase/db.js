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

type Item = {
  id: string,
  text: string,
}
const getRandomId = () =>
  Math.random()
    .toString(36)
    .substr(2, 5)

export const writeNewChecklistTemplate = (
  userId: string,
  name: string,
  items: Map<string, Item>
) => {
  const id = getRandomId()
  return firebase
    .database()
    .ref(`checklistTemplates/${userId}/${id}`)
    .set({
      name,
      items: [...items.values()],
    })
}
