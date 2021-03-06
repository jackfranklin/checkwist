import firebase from './config'

const getUserData = userId =>
  firebase
    .database()
    .ref(`/users/${userId}`)
    .once('value')
    .then(snapshot => (snapshot ? snapshot.val() : undefined))

export const writeUserDataIfNewUser = (userId, displayName, imageUrl) => {
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

const getRandomId = () =>
  Math.random()
    .toString(36)
    .substr(2, 5)

export const writeNewChecklistTemplate = (userId, name, items) => {
  const id = getRandomId()
  return firebase
    .database()
    .ref(`checklistTemplates/${userId}/${id}`)
    .set({
      name,
      items: [...items.values()],
    })
}
