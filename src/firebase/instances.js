// @flow

import firebase from './config'

export type InstanceItem = {
  id: string,
  text: string,
  done: boolean,
}
export type ChecklistInstance = {
  instanceId: string,
  templateId: string,
  createdAt: number,
  items: Map<string, InstanceItem>,
  name: string,
}

export type ChecklistFirebaseInstance = {
  instanceId: string,
  templateId: string,
  createdAt: number,
  items: Array<InstanceItem>,
  name: string,
}

type InstancesFromFirebase = {
  [id: string]: ChecklistFirebaseInstance,
}
export const checklistInstancesToArray = (
  obj: InstancesFromFirebase
): Array<[string, ChecklistFirebaseInstance]> => {
  const keys: string[] = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

export const removeUserInstance = (userId: string, instanceId: string) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}/${instanceId}`)
    .remove()
export const fetchUserInstance = (
  userId: string,
  instanceId: string,
  cb: $npm$firebase$database$DataSnapshot => void
) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}/${instanceId}`)
    .on('value', cb)

export const fetchUserInstances = (
  userId: string,
  cb: $npm$firebase$database$DataSnapshot => void
) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}`)
    .on('value', cb)
