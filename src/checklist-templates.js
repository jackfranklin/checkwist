// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { fetchUserTemplates } from './firebase/db'
import { Link } from 'react-router-dom'

type Props = {
  user: $npm$firebase$auth$User,
}

type State = {
  templates: Array<{}>,
}

const NewTemplateBtn = styled.div``
export default class ChecklistTemplates extends Component<Props, State> {
  componentDidMount() {
    fetchUserTemplates(this.props.user.uid, snapshot => {
      this.setState({ templates: snapshot.val().checklistTemplates || [] })
    })
  }

  render() {
    return (
      <div>
        <NewTemplateBtn>
          <Link to="/templates/new">Create a new template</Link>
        </NewTemplateBtn>
      </div>
    )
  }
}
