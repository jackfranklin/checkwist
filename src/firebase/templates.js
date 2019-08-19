import firebase from './config'
import { getRandomId } from '../get-random-id'

export const checklistTemplateItemsToArray = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

const fetchUserTemplates = (userId, cb) =>
  firebase
    .database()
    .ref(`checklistTemplates/${userId}`)
    .on('value', cb)

export const removeUserTemplate = (userId, templateId) =>
  firebase
    .database()
    .ref(`checklistTemplates/${userId}/${templateId}`)
    .remove()

export const fetchUserTemplate = (userId, templateId, cb) =>
  firebase
    .database()
    .ref(`checklistTemplates/${userId}/${templateId}`)
    .once('value', cb)

export const getUserTemplatesMap = (userId, cb) => {
  fetchUserTemplates(userId, snapshot => {
    const snapshotValue = snapshot.val()
    if (snapshot.val()) {
      const templates = new Map(checklistTemplateItemsToArray(snapshotValue))
      cb(templates)
    } else {
      cb(new Map())
    }
  })
}

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

export const updateChecklistTemplate = (userId, templateId, name, items) => {
  return firebase
    .database()
    .ref(`checklistTemplates/${userId}/${templateId}`)
    .set({
      name,
      items: [...items.values()],
    })
}

export const cloneTemplateToInstance = (
  userId,
  checklistTemplateId,
  newName,
  cb
) => {
  fetchUserTemplate(userId, checklistTemplateId, snapshot => {
    const checklist = snapshot.val()
    if (checklist) {
      const newInstance = {
        instanceId: getRandomId(),
        templateId: checklistTemplateId,
        createdAt: Date.now(),
        items: checklist.items.map(item => ({ ...item, done: false })),
        name: newName,
      }
      firebase
        .database()
        .ref(`checklistInstances/${userId}/${newInstance.instanceId}`)
        .set(newInstance)
        .then(() => cb(newInstance.instanceId))
    }
  })
}
