import { getRandomId } from './get-random-id'

export const newChecklist = () => ({
  name: '',
  items: new Map(),
})

const cloneAndManipulateItems = (form, newItemsManipulator) => {
  const newItems = new Map(form.items)
  newItemsManipulator(newItems)
  return { items: newItems, name: form.name }
}

export const updateItemText = (form, itemId, itemValue: string) => {
  return cloneAndManipulateItems(form, newItems => {
    newItems.set(itemId, { id: itemId, text: itemValue })
  })
}

export const removeItem = (form, itemId) => {
  return cloneAndManipulateItems(form, newItems => {
    newItems.delete(itemId)
  })
}

const makeNewItem = () => ({
  id: getRandomId(),
  text: '',
})

const formItemsAsArray = items => [...items.entries()]

export const addNewItemBelowIndex = (form, itemIndex) => {
  const itemsArray = formItemsAsArray(form.items)
  const newItem = makeNewItem()
  itemsArray.splice(itemIndex + 1, 0, [newItem.id, newItem])
  return { items: new Map(itemsArray), name: form.name }
}

export const addNewItem = form => {
  const newItem = makeNewItem()
  return cloneAndManipulateItems(form, newItems => {
    newItems.set(newItem.id, newItem)
  })
}

export const removeEmptyItems = form => {
  const itemsArray = formItemsAsArray(form.items)
  const filteredItems = itemsArray.filter(([itemId, { text }]) => text !== '')

  return {
    name: form.name,
    items: new Map(filteredItems),
  }
}
