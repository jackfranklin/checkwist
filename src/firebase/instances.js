// @flow

type InstanceItem = {
  id: string,
  text: string,
  done: boolean,
}
export type ChecklistInstance = {
  instanceId: string,
  templateId: string,
  createdAt: Date,
  items: Map<string, InstanceItem>,
  name: string,
}

export type ChecklistFirebaseInstance = {
  instanceId: string,
  templateId: string,
  createdAt: Date,
  items: Array<InstanceItem>,
  name: string,
}
