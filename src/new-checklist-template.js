// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  user: $npm$firebase$auth$User,
}

type State = {
  name: ?String,
  items: String[],
}

const FormGroup = styled.div`
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
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
  width: 80%;
  display: flex;
  align-items: center;
  list-style: none;
`

const FormItemInput = FormTextInput.extend`
  width: 100%;
`

const AddNewFormItem = styled.button.attrs({ type: 'button' })`
  :hover {
    cursor: pointer;
  }
`

const FormItemCheckbox = styled.input.attrs({
  type: 'checkbox',
  checked: true,
  disabled: true,
})`
  margin-right: 20px;
`

export default class NewChecklistTemplate extends Component<Props, State> {
  state = {
    name: '',
    items: [],
  }

  onNameChange = e => this.setState({ name: e.target.value })

  updateItemAtIndex(index, value) {
    this.setState(({ items }) => {
      const itemsCopy = this.state.items.slice()
      itemsCopy[index] = value
      return { items: itemsCopy }
    })
  }

  renderItem(item: String, index: Number) {
    return (
      <FormItem key={index}>
        <FormItemCheckbox />
        <FormItemInput
          value={item}
          onChange={e => this.updateItemAtIndex(index, e.target.value)}
        />
      </FormItem>
    )
  }

  addNewItem = e => {
    e.preventDefault()
    this.setState(prevState => ({ items: [...prevState.items, ''] }))
  }

  addButtonDisabled() {
    const lastItem = this.state.items[this.state.items.length - 1]
    return lastItem !== undefined && lastItem === ''
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormNameGroup>
          <FormLabel>Checklist name</FormLabel>
          <FormTextInput
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Packing for Christmas"
          />
        </FormNameGroup>

        <FormGroup>
          <h4>Checklist items</h4>
          <FormItemsList>
            {this.state.items.map((item, index) =>
              this.renderItem(item, index)
            )}
          </FormItemsList>
          <AddNewFormItem
            disabled={this.addButtonDisabled()}
            onClick={this.addNewItem}
          >
            +
          </AddNewFormItem>
        </FormGroup>
      </form>
    )
  }
}
