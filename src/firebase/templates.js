// @flow

import firebase from 'firebase'
import { getRandomId } from '../get-random-id'

export type TemplateItem = {
  id: string,
  text: string,
}

export type ChecklistTemplate = {
  items: TemplateItem[],
  name: string,
}

type ChecklistTemplateFromFirebase = {
  [id: string]: ChecklistTemplate,
}
export const checklistTemplateItemsToArray = (
  obj: ChecklistTemplateFromFirebase
): Array<[string, ChecklistTemplate]> => {
  const keys: string[] = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

const fetchUserTemplates = (
  userId: string,
  cb: $npm$firebase$database$DataSnapshot => void
) =>
  firebase
    .database()
    .ref(`checklistTemplates/${userId}`)
    .on('value', cb)

export const fetchUserTemplate = (
  userId: string,
  templateId: string,
  cb: $npm$firebase$database$DataSnapshot => void
) =>
  firebase
    .database()
    .ref(`checklistTemplates/${userId}/${templateId}`)
    .once('value', cb)

export const getUserTemplatesMap = (
  userId: string,
  cb: (Map<string, ChecklistTemplate>) => void
): void => {
  fetchUserTemplates(userId, snapshot => {
    const snapshotValue: { [id: string]: ChecklistTemplate } = snapshot.val()
    if (snapshot.val()) {
      const templates = new Map(checklistTemplateItemsToArray(snapshotValue))
      cb(templates)
    } else {
      cb(new Map())
    }
  })
}

export const writeNewChecklistTemplate = (
  userId: string,
  name: string,
  items: Map<string, TemplateItem>
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

export const updateChecklistTemplate = (
  userId: string,
  templateId: string,
  name: string,
  items: Map<string, TemplateItem>
) => {
  return firebase
    .database()
    .ref(`checklistTemplates/${userId}/${templateId}`)
    .set({
      name,
      items: [...items.values()],
    })
}