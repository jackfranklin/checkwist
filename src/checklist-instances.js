// @flow

import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  fetchUserInstances,
  checklistInstancesToArray,
  removeUserInstance,
} from './firebase/instances'
import type { ChecklistFirebaseInstance } from './firebase/instances'
import Spinner from './spinner'

import { EmptyList, red, green, stylesForButtonWithColour } from './styles'

type Props = {
  user: $npm$firebase$auth$User,
}
type State = {
  instances: Map<string, ChecklistFirebaseInstance>,
  isLoading: boolean,
}

const InstancesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const InstancesListItem = styled.li`
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
`

const instanceActionStyles = css`
  width: 20%;
  line-height: 50px;
  margin-left: 3%;
  text-align: center;
  height: 50px;
  display: block;
  border-radius: 3px;
  &:link,
  &:visited {
    color: #111;
    text-decoration: none;
  }
`

const DeleteInstanceButton = styled.button`
  border: none;
  ${instanceActionStyles};
  ${stylesForButtonWithColour(red)};
`

const UseInstanceLink = styled(Link)`
  ${instanceActionStyles};
  ${stylesForButtonWithColour(green)};
`

const InstanceName = styled.h5`
  width: 60%;
  font-size: 25px;
`

export default class ChecklistInstances extends Component<Props, State> {
  state: State = {
    instances: new Map(),
    isLoading: true,
  }

  componentDidMount() {
    fetchUserInstances(this.props.user.uid, snapshot => {
      const instances = snapshot.val()
      if (instances) {
        const instancesAsArray = checklistInstancesToArray(instances)

        const instancesMap = new Map(instancesAsArray)

        this.setState({ instances: instancesMap, isLoading: false })
      } else {
        this.setState({ isLoading: false })
      }
    })
  }

  deleteInstance(id: string, e: SyntheticInputEvent<HTMLInputElement>) {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      removeUserInstance(this.props.user.uid, id).then(() => {
        this.setState(({ instances }) => {
          const newInstances = new Map(instances)
          newInstances.delete(id)
          return { instances: newInstances }
        })
      })
    }
  }

  renderInstance(instanceId: string) {
    const instance = this.state.instances.get(instanceId)
    if (!instance) return null
    return (
      <InstancesListItem key={instanceId}>
        <InstanceName>{instance.name}</InstanceName>
        <DeleteInstanceButton onClick={e => this.deleteInstance(instanceId, e)}>
          Delete
        </DeleteInstanceButton>
        <UseInstanceLink to={`/instances/${instanceId}`}>Use</UseInstanceLink>
      </InstancesListItem>
    )
  }

  render() {
    const instanceIds = [...this.state.instances.keys()]

    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <div>
        <InstancesList>
          {instanceIds.map(instanceId => this.renderInstance(instanceId))}
          {instanceIds.length === 0 && (
            <EmptyList>
              You haven&rsquo;t created any checklists yet.<br />Checklists are
              created from templates that you can create below.
            </EmptyList>
          )}
        </InstancesList>
      </div>
    )
  }
}
