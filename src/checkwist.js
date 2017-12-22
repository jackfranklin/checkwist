// @flow
import React, { Component, Fragment } from 'react'
import { getAuthState } from './firebase/auth'
import { writeUserDataIfNewUser } from './firebase/db'
import Header from './header'
import { injectGlobal } from 'styled-components'
import normaliseCss from 'normalize.css/normalize.css'
import ChecklistTemplates from './checklist-templates'
import { BrowserRouter, Route } from 'react-router-dom'
import NewChecklistTemplate from './new-checklist-template'
import ChecklistTemplateForm from './checklist-template-form'

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
                  <NewChecklistTemplate {...props} user={user} />
                )}
              />
              <Route
                path="/templates/:templateId"
                render={props => (
                  <ChecklistTemplateForm
                    {...props}
                    user={user}
                    checkListId={props.match.params.templateId}
                  />
                )}
              />
            </Fragment>
          )}
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default Checkwist
