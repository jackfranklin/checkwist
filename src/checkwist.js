// @flow
import React, { Component } from 'react'
import { getAuthState } from './firebase/auth'
import { writeUserDataIfNewUser } from './firebase/db'
import Header from './header'
import { injectGlobal } from 'styled-components'
import normaliseCss from 'normalize.css/normalize.css'
import ChecklistTemplates from './checklist-templates'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import ChecklistTemplateForm from './checklist-template-form'
import NewFromTemplate from './new-from-template'
import ChecklistInstanceForm from './checklist-instance-form'
import { Container, yellow } from './styles'
import styled from 'styled-components'

type Props = {}
type State = { user: ?$npm$firebase$auth$User, isLoading: boolean }

injectGlobal`
  ${normaliseCss}
  * { font-family: 'Slabo 27px', serif; box-sizing: border-box; }
`

type UserRouteProps = { user: $npm$firebase$auth$User }

const UserRoutes = ({ user }: UserRouteProps) => (
  <Switch>
    <Route
      path="/"
      exact
      render={routeProps => <ChecklistTemplates {...routeProps} user={user} />}
    />
    <Route
      path="/templates/new"
      render={routeProps => (
        <ChecklistTemplateForm {...routeProps} user={user} />
      )}
    />
    <Route
      path="/new-from-template/:templateId"
      render={routeProps => {
        const templateId: string =
          (routeProps.match.params && routeProps.match.params.templateId) || ''

        if (templateId === '') return <Redirect to="/" />
        return (
          <NewFromTemplate
            {...routeProps}
            user={user}
            checklistId={templateId}
          />
        )
      }}
    />
    <Route
      path="/templates/:templateId"
      render={routeProps => {
        const templateId: string =
          (routeProps.match.params && routeProps.match.params.templateId) || ''

        if (templateId === '') return <Redirect to="/" />

        return (
          <ChecklistTemplateForm
            {...routeProps}
            user={user}
            checklistId={templateId}
          />
        )
      }}
    />
    <Route
      path="/instances/:instanceId"
      render={routeProps => {
        const instanceId: string =
          (routeProps.match.params && routeProps.match.params.instanceId) || ''

        if (instanceId === '') return <Redirect to="/" />

        return (
          <ChecklistInstanceForm
            {...routeProps}
            user={user}
            instanceId={instanceId}
          />
        )
      }}
    />
  </Switch>
)

const LoggedOutHero = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 50px auto;
  background: ${yellow()};
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #111;
  > h3 {
    font-size: 25px;
    line-height: 35px;
  }
  > p {
    font-size: 20px;
    line-height: 28px;
  }
`

class Checkwist extends Component<Props, State> {
  state = {
    user: undefined,
    isLoading: true,
  }

  componentDidMount() {
    getAuthState(user => {
      this.setState({ user, isLoading: false })
      if (user) {
        writeUserDataIfNewUser(user.uid, user.displayName, user.photoURL)
      }
    })
  }

  render() {
    const { user, isLoading } = this.state
    return (
      <BrowserRouter>
        <Container>
          <Header user={user} />
          {user ? (
            <UserRoutes user={user} />
          ) : isLoading ? null : (
            <LoggedOutHero>
              <h3>
                Checkwist is an app to keep track of those lists you use over
                and over again.
              </h3>
              <p>
                Packing for another summer holiday? Use your summer checklist to
                make sure you don&rsquo;t forget that suncream!
              </p>
              <p>
                Preparing to go home for Christmas? Better not forget that phone
                charger and family presents.
              </p>
              <p>
                Doing your weekly shop in Tesco? Don&rsquo;t forget the milk!
              </p>
            </LoggedOutHero>
          )}
        </Container>
      </BrowserRouter>
    )
  }
}

export default Checkwist
