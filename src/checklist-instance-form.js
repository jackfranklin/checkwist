// @flow
import React, { Component } from 'react'
import { fetchUserInstance } from './firebase/instances'
import type { InstanceItem, ChecklistInstance } from './firebase/instances'
import Spinner from './spinner'
import styled from 'styled-components'
import { distanceInWords } from 'date-fns'

type Props = {
  instanceId: string,
  user: $npm$firebase$auth$User,
}

type State = {
  checklist: ChecklistInstance | null,
  isLoading: boolean,
}
const FormItemsList = styled.ul`
  padding: 0;
  margin: 0 auto;
  width: 90%;
`

const FormItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid #eee;
  padding: 10px;

  &:hover {
    background: #eee;
    cursor: pointer;
  }
`

const FormItemText = styled.div`
  margin-left: auto;
  padding: 10px;
  width: 95%;
  text-decoration: ${props => (props.done ? 'line-through' : 'inherit')};
`

const FormItemCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  margin-right: 5px;
`

class ChecklistInstanceForm extends Component<Props, State> {
  state: State = {
    checklist: null,
    isLoading: true,
  }

  componentDidMount() {
    fetchUserInstance(this.props.user.uid, this.props.instanceId, snapshot => {
      const checklist = snapshot.val()
      if (checklist) {
        const itemsAsMap: Map<string, InstanceItem> = new Map(
          checklist.items.map(item => [item.id, item])
        )
        this.setState({
          isLoading: false,
          checklist: {
            ...checklist,
            items: itemsAsMap,
          },
        })
      }
    })
  }

  toggleItemCompletion(itemId: string) {
    if (this.state.checklist !== null) {
      const item = this.state.checklist.items.get(itemId)
      if (item && this.state.checklist !== null) {
        const items = new Map(this.state.checklist.items)
        items.set(item.id, {
          ...item,
          done: !item.done,
        })
        this.setState(prevState => ({
          checklist: {
            ...prevState.checklist,
            items,
          },
        }))
      }
    }
  }

  renderItem(itemId: string, item: ?InstanceItem) {
    if (item) {
      return (
        <FormItem key={itemId} onClick={e => this.toggleItemCompletion(itemId)}>
          <FormItemCheckbox checked={item.done} disabled={true} />
          <FormItemText done={item.done}>{item.text}</FormItemText>
        </FormItem>
      )
    } else {
      return null
    }
  }
  render() {
    const { checklist, isLoading } = this.state
    console.log('created at', checklist && checklist.createdAt)
    return isLoading ? (
      <Spinner />
    ) : checklist ? (
      <div>
        <h4>
          {checklist.name} &mdash; created{' '}
          {distanceInWords(new Date(checklist.createdAt), Date.now())} ago
        </h4>
        <FormItemsList>
          {[...checklist.items.keys()].map(itemId =>
            this.renderItem(itemId, checklist.items.get(itemId))
          )}
        </FormItemsList>
      </div>
    ) : null
  }
}

export default ChecklistInstanceForm
