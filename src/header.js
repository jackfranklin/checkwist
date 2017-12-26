// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { signUserIn, signUserOut } from './firebase/auth'

type Props = {
  user: ?$npm$firebase$auth$User,
}
const ChecklistLogo = () => (
  <svg width="68px" height="90px" viewBox="0 0 68 90">
    <g fill="#fff">
      <path
        d="M57,15.08 L51.83,15.08 L51.83,13.08 C51.83,11.4231458 50.4868542,10.08 48.83,10.08 L44.71,10.08 C43.8716849,4.817964 39.3333952,0.945454485 34.005,0.945454485 C28.6766048,0.945454485 24.1383151,4.817964 23.3,10.08 L19.17,10.08 C17.5131458,10.08 16.17,11.4231458 16.17,13.08 L16.17,15.08 L11,15.08 C4.92486775,15.08 0,20.0048678 0,26.08 L0,78.08 C7.10542736e-15,84.1551322 4.92486775,89.08 11,89.08 L57,89.08 C63.0751322,89.08 68,84.1551322 68,78.08 L68,26.08 C68,20.0048678 63.0751322,15.08 57,15.08 Z M22.17,16.08 L26.17,16.08 C27.8268542,16.08 29.17,14.7368542 29.17,13.08 L29.17,11.75 C29.17,9.07970323 31.3347032,6.915 34.005,6.915 C36.6752968,6.915 38.84,9.07970323 38.84,11.75 L38.84,13.09 C38.84,14.7468542 40.1831458,16.09 41.84,16.09 L45.84,16.09 L45.84,22.92 L22.17,22.92 L22.17,16.08 Z M62,78.08 C62,80.8414237 59.7614237,83.08 57,83.08 L11,83.08 C8.23857625,83.08 6,80.8414237 6,78.08 L6,26.08 C6,23.3185763 8.23857625,21.08 11,21.08 L16.17,21.08 L16.17,25.91 C16.17,27.5668542 17.5131458,28.91 19.17,28.91 L48.83,28.91 C50.4868542,28.91 51.83,27.5668542 51.83,25.91 L51.83,21.08 L57,21.08 C59.7614237,21.08 62,23.3185763 62,26.08 L62,78.08 Z"
        id="Shape"
      />
      <path
        d="M45,45.1 L30,58.41 L23.3,50.88 C22.5854688,50.0761524 21.4963672,49.7145645 20.4429492,49.9314428 C19.3895312,50.1483212 18.531836,50.9107169 18.1929492,51.9314428 C17.8540624,52.9521688 18.0854688,54.0761524 18.8,54.88 L27.43,64.66 C27.9598448,65.2549701 28.7045898,65.6147503 29.5,65.66 L29.68,65.66 C30.4161032,65.6638377 31.1279251,65.3969045 31.68,64.91 L48.94,49.61 C49.7420612,48.8954688 50.1019986,47.8073202 49.884227,46.7554492 C49.6664555,45.7035782 48.9040598,44.847789 47.884227,44.5104492 C46.8643943,44.1731094 45.7420612,44.4054688 44.94,45.12 L45,45.1 Z"
        id="Shape"
      />
    </g>
  </svg>
)

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
  display: flex;
  &:link,
  &:visited {
    color: #fff;
    text-decoration: none;
  }
  > svg {
    height: 40px;
    width: 50px;
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

export default class Header extends Component<Props, null> {
  changeAuth = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.props.user ? signUserOut() : signUserIn()
  }

  render() {
    return (
      <NavBar>
        <Logo href="/">
          <ChecklistLogo />
          <span>
            Checkwist{this.props.user ? (
              <Fragment>
                &nbsp;&mdash;&nbsp;{this.props.user.displayName}
              </Fragment>
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
