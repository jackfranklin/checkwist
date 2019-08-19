import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { cloneTemplateToInstance } from './firebase/templates'
import styled from 'styled-components'
import { SubmitButton } from './styles'

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  border: 1px solid #ccc;
  padding: 10px;
`

const FormHeading = styled.h3``
const NameInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Skiing 2018',
})`
  display: block;
  padding: 10px;
  font-size: 20px;
  width: 67%;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
`
const FormSubmitBtn = SubmitButton.extend`
  width: 30%;
  margin-left: auto;
`

class NewFromTemplate extends Component {
  state = {
    newName: '',
  }

  createInstance = e => {
    e.preventDefault()
    cloneTemplateToInstance(
      this.props.user.uid,
      this.props.checklistId,
      this.state.newName,
      instanceId => this.setState({ instanceId })
    )
  }

  updateName = e => {
    this.setState({ newName: e.target.value })
  }

  render() {
    return this.state.instanceId ? (
      <Redirect to={`/instances/${this.state.instanceId}`} />
    ) : (
      <Form onSubmit={this.createInstance}>
        <FormHeading>Enter a name for your checklist.</FormHeading>

        <FormGroup>
          <NameInput onChange={this.updateName} value={this.state.newName} />
          <FormSubmitBtn disabled={this.state.newName === ''}>
            Save
          </FormSubmitBtn>
        </FormGroup>
      </Form>
    )
  }
}

export default NewFromTemplate
