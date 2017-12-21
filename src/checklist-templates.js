// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { fetchUserTemplates } from './firebase/db'
import { Link } from 'react-router-dom'

type Props = {
  user: $npm$firebase$auth$User,
}
type Template = {
  items: Item[],
  name: string,
}

type Item = {
  id: string,
  text: string,
}

type State = {
  templates: Map<string, Template>,
}

function entries<T>(obj: { [string]: T }): Array<[string, T]> {
  const keys: string[] = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

const NewTemplateBtn = styled(Link)`
  display: block;
  width: 100%;
  margin-top: 30px;
  height: 50px;
  text-align: center;
  border: 1px solid #eee;
  line-height: 50px;
  font-size: 20px;
  background: #ddd;
  &:link,
  &:visited {
    color: #fff;
    text-decoration: none;
  }
  &:hover {
    background: #ccc;
  }
`

const TemplatesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const TemplateItem = styled.li`
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
`

const TemplateLink = styled(Link)`
  width: 15%;
  line-height: 50px;
  margin-left: 4%;
  text-align: center;
  height: 50px;
  display: block;
  background: #eee;
  border-radius: 3px;
`

const TemplateName = styled.h5`
  width: 60%;
  font-size: 25px;
`

export default class ChecklistTemplates extends Component<Props, State> {
  state: State = {
    templates: new Map(),
  }

  componentDidMount() {
    fetchUserTemplates(this.props.user.uid, snapshot => {
      const snapshotValue: { [id: string]: Template } = snapshot.val()

      if (snapshot.val()) {
        const templates = new Map(entries(snapshotValue))
        this.setState({ templates })
      }
    })
  }

  renderTemplate(templateId: string) {
    const template = this.state.templates.get(templateId)
    if (!template) return null
    console.log('got template', template)
    return (
      <TemplateItem key={templateId}>
        <TemplateName>{template.name}</TemplateName>
        <TemplateLink to={`/templates/${templateId}`}>Edit</TemplateLink>
        <TemplateLink to={`/new-from-template/${templateId}`}>Use</TemplateLink>
      </TemplateItem>
    )
  }

  render() {
    const templateIds = [...this.state.templates.keys()]

    return (
      <div>
        <TemplatesList>
          {templateIds.map(templateId => this.renderTemplate(templateId))}
        </TemplatesList>
        <NewTemplateBtn to="/templates/new">
          Create a new template
        </NewTemplateBtn>
      </div>
    )
  }
}
