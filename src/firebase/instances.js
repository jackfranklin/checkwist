import firebase from './config'

export const checklistInstancesToArray = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

export const removeUserInstance = (userId, instanceId) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}/${instanceId}`)
    .remove()

export const fetchUserInstance = (userId, instanceId, cb) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}/${instanceId}`)
    .on('value', cb)

export const fetchUserInstances = (userId, cb) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}`)
    .on('value', cb)
