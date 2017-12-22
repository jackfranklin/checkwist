// @flow
import React, { Component, Fragment } from 'react'
import { getAuthState } from './firebase/auth'
import { writeUserDataIfNewUser } from './firebase/db'
import Header from './header'
import { injectGlobal } from 'styled-components'
import normaliseCss from 'normalize.css/normalize.css'
import ChecklistTemplates from './checklist-templates'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import ChecklistTemplateForm from './checklist-template-form'
import NewFromTemplate from './new-from-template'

type Props = {}
type State = { user: ?$npm$firebase$auth$User }

injectGlobal`
  ${normaliseCss}
  * { font-family: 'Slabo 27px', serif; box-sizing: border-box; }
`

class Checkwist extends Component<Props, State> {
  state = {
    user: undefined,
  }

  componentDidMount() {
    getAuthState(user => {
      this.setState({ user })
      if (user) {
        writeUserDataIfNewUser(user.uid, user.displayName, user.photoURL)
      }
    })
  }

  render() {
    const { user } = this.state
    return (
      <BrowserRouter>
        <Fragment>
          <Header user={user} />
          {user && (
            <Fragment>
              <Route
                path="/"
                exact
                render={props => <ChecklistTemplates {...props} user={user} />}
              />
              <Route
                path="/templates/new"
                render={props => (
                  <ChecklistTemplateForm {...props} user={user} />
                )}
              />
              <Route
                path="/new-from-template/:templateId"
                render={props => {
                  const templateId: string =
                    (props.match.params && props.match.params.templateId) || ''

                  if (templateId === '') return <Redirect to="/" />
                  return (
                    <NewFromTemplate
                      {...props}
                      user={user}
                      checklistId={templateId}
                    />
                  )
                }}
              />
              <Route
                path="/templates/:templateId"
                render={props => {
                  const templateId: string =
                    (props.match.params && props.match.params.templateId) || ''

                  if (templateId === '') return <Redirect to="/" />

                  return (
                    <ChecklistTemplateForm
                      {...props}
                      user={user}
                      checklistId={templateId}
                    />
                  )
                }}
              />
            </Fragment>
          )}
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default Checkwist
