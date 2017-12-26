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

export const fetchUserInstance = (
  userId: string,
  instanceId: string,
  cb: $npm$firebase$database$DataSnapshot => void
) =>
  firebase
    .database()
    .ref(`checklistInstances/${userId}/${instanceId}`)
    .on('value', cb)
