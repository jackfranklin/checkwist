// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { writeNewChecklistTemplate } from './firebase/db'
import { fetchUserTemplate } from './firebase/templates'
import type { RouterHistory } from 'react-router-dom'
import {
  newChecklist,
  updateItemText,
  removeItem,
  addNewItemBelowIndex,
  addNewItem,
  removeEmptyItems,
} from './checklist-template-creator'
import type { ChecklistTemplateForm } from './checklist-template-creator'
import spinnerSvg from './spinner.svg'

// parceljs bug I think
const spinnerPath =
  process.env.NODE_ENV === 'development' ? `/dist${spinnerSvg}` : spinnerSvg

type Props = {
  user: $npm$firebase$auth$User,
  checkListId?: string,
  history: RouterHistory,
}

type State = {
  form: ChecklistTemplateForm,
  isLoading: boolean,
}

const FormGroup = styled.div`
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  position: relative;
`

const FormNameGroup = FormGroup.extend`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
`

const FormLabel = styled.label`
  width: 30%;
`

const FormTextInput = styled.input`
  width: 65%;
  margin-left: auto;
  padding: 10px;
`

const FormItemsList = styled.ul`
  padding: 0;
  margin: 0 auto;
  width: 90%;
`

const FormItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`

const FormItemInput = FormTextInput.extend`
  width: 75%;
`

const AddNewFormItem = styled.button.attrs({ type: 'button' })`
  position: absolute;
  right: 5px;
  bottom: -55px;
  display: block;
  width: 50px;
  height: 50px;
  border: 2px solid #f5f5f5;
  border-radius: 50%;
  color: #f5f5f5;
  text-align: center;
  text-decoration: none;
  background: #464646;
  box-shadow: 0 0 3px gray;
  font-size: 20px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
  &[disabled] {
    opacity: 0.5;
    &:hover {
      cursor: default;
    }
  }
`

const RemoveFormItem = styled.button.attrs({ type: 'button' })`
  display: block;
  margin-left: auto;
  width: 30px;
  height: 30px;
  border: 2px solid #f5f5f5;
  border-radius: 50%;
  color: #f5f5f5;
  text-align: center;
  text-decoration: none;
  background: #464646;
  box-shadow: 0 0 3px gray;
  font-size: 20px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
  &[disabled] {
    opacity: 0.5;
    &:hover {
      cursor: default;
    }
  }
`

const FormItemCheckbox = styled.input.attrs({
  type: 'checkbox',
  checked: true,
  disabled: true,
})`
  margin-right: 5px;
`

const SaveButton = styled.button.attrs({ type: 'submit' })`
  width: 100%;
  height: 50px;
  background: #111;
  color: #fff;
  margin-top: 70px;
  &:hover {
    cursor: pointer;
    background: #ccc;
  }
  &[disabled] {
    cursor: default;
    opacity: 0.5;
  }
`

const Spinner = styled.img.attrs({
  src: spinnerPath,
})`
  display: block;
  margin: 20px auto;
`

export default class NewChecklistTemplate extends Component<Props, State> {
  // TODO: figure out what this type is
  itemsDom: any

  state: State = { form: newChecklist(), isLoading: true }

  componentDidMount() {
    if (this.props.checkListId) {
      fetchUserTemplate(
        this.props.user.uid,
        this.props.checkListId,
        snapshot => {
          const checklist = snapshot.val()
          if (checklist) {
            const itemsMap = new Map(
              checklist.items.map(item => [item.id, item])
            )
            this.setState({
              form: {
                name: checklist.name,
                items: itemsMap,
              },
              isLoading: false,
            })
          }
        }
      )
    } else {
      this.setState({ isLoading: false })
    }
  }
  onNameChange = (e: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState(({ form }) => ({
      form: { ...form, name: e.target.value },
    }))

  updateItem(itemId: string, value: string) {
    this.setState({ form: updateItemText(this.state.form, itemId, value) })
  }

  removeItem(itemId: string, e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault()
    this.setState({ form: removeItem(this.state.form, itemId) })
  }

  addNewItemBelowIndex(
    index: number,
    e: SyntheticInputEvent<HTMLInputElement>
  ) {
    e.preventDefault()
    this.setState(
      { form: addNewItemBelowIndex(this.state.form, index) },
      () => {
        // TODO: find a better way to get at the input within the new item
        const newestInput = this.itemsDom.childNodes[index + 1].childNodes[1]
        newestInput && newestInput.focus()
      }
    )
  }

  addNewItem = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    e.preventDefault()
    this.setState({ form: addNewItem(this.state.form) })
  }

  addButtonDisabled() {
    const itemValues = [...this.state.form.items.values()]
    const lastItem = itemValues[itemValues.length - 1]
    return lastItem !== undefined && lastItem.text === ''
  }

  onSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault()
    const withEmptyRemoved = removeEmptyItems(this.state.form)

    writeNewChecklistTemplate(
      this.props.user.uid,
      withEmptyRemoved.name,
      withEmptyRemoved.items
    )
      .then(x => {
        console.log('got here', this.props)
        console.log('success', x)
        this.props.history.push(`/`)
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  renderItem(itemId: string, index: number) {
    const item = this.state.form.items.get(itemId)
    if (!item) return null
    return (
      <FormItem key={item.id}>
        <FormItemCheckbox />
        <FormItemInput
          value={item.text}
          onChange={e => this.updateItem(itemId, e.target.value)}
          onKeyPress={e =>
            e.key === 'Enter' ? this.addNewItemBelowIndex(index, e) : null
          }
        />
        <RemoveFormItem onClick={e => this.removeItem(itemId, e)}>
          -
        </RemoveFormItem>
      </FormItem>
    )
  }

  render() {
    const { isLoading, form } = this.state
    const itemIds = [...form.items.keys()]
    console.log('got spinner', spinnerSvg)
    return isLoading || true ? (
      <Spinner />
    ) : (
      <form onSubmit={this.onSubmit}>
        <FormNameGroup>
          <FormLabel>Checklist name</FormLabel>
          <FormTextInput
            type="text"
            value={this.state.form.name}
            onChange={this.onNameChange}
            placeholder="Packing for Christmas"
          />
        </FormNameGroup>

        <FormGroup>
          <h4>Checklist items</h4>
          <FormItemsList innerRef={items => (this.itemsDom = items)}>
            {itemIds.map((itemId, index) => this.renderItem(itemId, index))}
          </FormItemsList>
          <AddNewFormItem
            disabled={this.addButtonDisabled()}
            onClick={this.addNewItem}
          >
            +
          </AddNewFormItem>
        </FormGroup>
        <SaveButton>Save</SaveButton>
      </form>
    )
  }
}
