// @flow
import { getRandomId } from './get-random-id'
import type { TemplateItem } from './firebase/templates'

export type ChecklistTemplateForm = {
  name: string,
  items: Map<string, TemplateItem>,
}

export const newChecklist = (): ChecklistTemplateForm => ({
  name: '',
  items: new Map(),
})

type ItemManipulator = (Map<string, TemplateItem>) => void

const cloneAndManipulateItems = (
  form: ChecklistTemplateForm,
  newItemsManipulator: ItemManipulator
): ChecklistTemplateForm => {
  const newItems = new Map(form.items)
  newItemsManipulator(newItems)
  return { items: newItems, name: form.name }
}

export const updateItemText = (
  form: ChecklistTemplateForm,
  itemId: string,
  itemValue: string
): ChecklistTemplateForm => {
  return cloneAndManipulateItems(form, newItems => {
    newItems.set(itemId, { id: itemId, text: itemValue })
  })
}

export const removeItem = (
  form: ChecklistTemplateForm,
  itemId: string
): ChecklistTemplateForm => {
  return cloneAndManipulateItems(form, newItems => {
    newItems.delete(itemId)
  })
}

const makeNewItem = (): TemplateItem => ({
  id: getRandomId(),
  text: '',
})

const formItemsAsArray = (
  items: Map<string, TemplateItem>
): Array<[string, TemplateItem]> => [...items.entries()]

export const addNewItemBelowIndex = (
  form: ChecklistTemplateForm,
  itemIndex: number
): ChecklistTemplateForm => {
  const itemsArray = formItemsAsArray(form.items)
  const newItem = makeNewItem()
  itemsArray.splice(itemIndex + 1, 0, [newItem.id, newItem])
  return { items: new Map(itemsArray), name: form.name }
}

export const addNewItem = (
  form: ChecklistTemplateForm
): ChecklistTemplateForm => {
  const newItem = makeNewItem()
  return cloneAndManipulateItems(form, newItems => {
    newItems.set(newItem.id, newItem)
  })
}

export const removeEmptyItems = (
  form: ChecklistTemplateForm
): ChecklistTemplateForm => {
  const itemsArray = formItemsAsArray(form.items)
  const filteredItems = itemsArray.filter(([itemId, { text }]) => text !== '')

  return {
    name: form.name,
    items: new Map(filteredItems),
  }
}
