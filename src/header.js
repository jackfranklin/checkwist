// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { signUserIn, signUserOut } from './firebase/auth'

type Props = {
  user: ?$npm$firebase$auth$User,
}

const NavBar = styled.nav`
  display: flex;
  background: #333;
  border-bottom: 1px solid #111;
  padding: 10px;
  height: 50px;
  align-items: center;
`

const Logo = styled.a`
  font-size: 20px;
  &:link,
  &:visited {
    color: #fff;
    text-decoration: none;
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

export default class Header extends Component<Props, null> {
  changeAuth = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.props.user ? signUserOut() : signUserIn()
  }

  render() {
    return (
      <NavBar>
        <Logo href="/">Checkwist</Logo>
        <AuthButton href="#" onClick={this.changeAuth}>
          {this.props.user ? 'Sign out' : 'Sign in'}
        </AuthButton>
      </NavBar>
    )
  }
}
