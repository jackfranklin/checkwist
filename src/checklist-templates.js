// @flow

import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { getUserTemplatesMap, removeUserTemplate } from './firebase/templates'
import type { ChecklistTemplate } from './firebase/templates'
import Spinner from './spinner'

import {
  EmptyList,
  red,
  green,
  blue,
  stylesForButtonWithColour,
} from './styles'

type Props = {
  user: $npm$firebase$auth$User,
}
type State = {
  templates: Map<string, ChecklistTemplate>,
  isLoading: boolean,
}

const NewTemplateBtn = styled(Link)`
  display: block;
  width: 100%;
  margin-top: 30px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  ${stylesForButtonWithColour(green)};
  &:link,
  &:visited {
    color: #111;
    text-decoration: none;
  }
`

const TemplatesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const TemplateListItem = styled.li`
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
`

const templateActionStyles = css`
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
const TemplateLink = styled(Link)`
  ${templateActionStyles};
`

const DeleteTemplateBtn = styled.button`
  border: none;
  ${templateActionStyles};
  ${stylesForButtonWithColour(red)};
`

const EditTemplateLink = TemplateLink.extend`
  ${stylesForButtonWithColour(blue)};
`

const UseTemplateLink = TemplateLink.extend`
  ${stylesForButtonWithColour(green)};
`

const TemplateName = styled.h5`
  width: 60%;
  font-size: 25px;
`

export default class ChecklistTemplates extends Component<Props, State> {
  state: State = {
    templates: new Map(),
    isLoading: true,
  }

  componentDidMount() {
    getUserTemplatesMap(this.props.user.uid, templates => {
      this.setState({ templates, isLoading: false })
    })
  }

  deleteTemplate(id: string, e: SyntheticInputEvent<HTMLInputElement>) {
    if (window.confirm('Are you sure you want to delete this template?')) {
      removeUserTemplate(this.props.user.uid, id).then(() => {
        this.setState(({ templates }) => {
          const templatesCopy = new Map(templates)
          templatesCopy.delete(id)
          return { templates: templatesCopy }
        })
      })
    }
  }
  renderTemplate(templateId: string) {
    const template = this.state.templates.get(templateId)
    if (!template) return null
    return (
      <TemplateListItem key={templateId}>
        <TemplateName>{template.name}</TemplateName>
        <DeleteTemplateBtn onClick={e => this.deleteTemplate(templateId, e)}>
          Delete
        </DeleteTemplateBtn>
        <EditTemplateLink to={`/templates/${templateId}`}>
          Edit
        </EditTemplateLink>
        <UseTemplateLink to={`/new-from-template/${templateId}`}>
          Use
        </UseTemplateLink>
      </TemplateListItem>
    )
  }

  render() {
    const templateIds = [...this.state.templates.keys()]

    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <Fragment>
        <TemplatesList>
          {templateIds.map(templateId => this.renderTemplate(templateId))}
          {templateIds.length === 0 && (
            <EmptyList>You haven&rsquo;t created any templates yet.</EmptyList>
          )}
        </TemplatesList>
        <NewTemplateBtn to="/templates/new">
          Create a new template
        </NewTemplateBtn>
      </Fragment>
    )
  }
}
