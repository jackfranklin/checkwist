// @flow
import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { cloneTemplateToInstance } from './firebase/templates'

type Props = {
  user: $npm$firebase$auth$User,
  checklistId: string,
}

type State = {
  instanceId?: string,
}

class NewFromTemplate extends Component<Props, State> {
  state: State = {}

  componentWillMount() {
    cloneTemplateToInstance(
      this.props.user.uid,
      this.props.checklistId,
      instanceId => this.setState({ instanceId })
    )
  }

  render() {
    return this.state.instanceId ? (
      <Redirect to={`/instances/${this.state.instanceId}`} />
    ) : null
  }
}

export default NewFromTemplate
