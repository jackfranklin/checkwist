import React, { Component } from 'react'
import styled from 'styled-components'
import { signUserIn, signUserOut } from './firebase/auth'
import ChecklistLogo from './logo'
import { Link } from 'react-router-dom'

const NavBar = styled.nav`
  display: flex;
  background: #333;
  border-bottom: 1px solid #111;
  padding: 10px;
  height: 50px;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 20px;
  display: flex;
  &:link,
  &:visited {
    color: #fff;
    text-decoration: none;
  }
  > svg {
    height: 40px;
    width: 50px;
    path {
      fill: #fff;
    }
  }
  > span {
    padding-top: 10px;
  }
`

const AuthButton = styled.a`
  margin-left: auto;
  background: #fff;
  display: block;
  border: 1px solid #111;
  padding: 10px;
  border-radius: 4px;

  &:link,
  &:visited {
    color: #111;
    text-decoration: none;
  }
  &:hover {
    background: #eee;
  }
`

export default class Header extends Component {
  changeAuth = e => {
    e.preventDefault()
    this.props.user ? signUserOut() : signUserIn()
  }

  render() {
    return (
      <NavBar>
        <Logo to="/">
          <ChecklistLogo />
          <span>
            Checkwist{this.props.user ? (
              <span>&nbsp;&mdash;&nbsp;{this.props.user.displayName}</span>
            ) : null}
          </span>
        </Logo>
        <AuthButton href="#" onClick={this.changeAuth}>
          {this.props.user ? 'Sign out' : 'Sign in with Twitter'}
        </AuthButton>
      </NavBar>
    )
  }
}
