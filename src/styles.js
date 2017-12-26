// @flow
import styled, { css } from 'styled-components'

const DEFAULT_OPACITY = 0.7
export const red = (opacity: ?number = DEFAULT_OPACITY) =>
  css`rgba(193, 34, 34, ${opacity})`
export const blue = (opacity: ?number = DEFAULT_OPACITY) =>
  css`rgba(0, 114, 187, ${opacity})`
export const green = (opacity: ?number = DEFAULT_OPACITY) =>
  css`rgba(118, 165, 48, ${opacity})`
export const yellow = (opacity: ?number = DEFAULT_OPACITY) =>
  css`rgba(208, 186, 50, ${opacity})`
export const orange = (opacity: ?number = DEFAULT_OPACITY) =>
  css`rgba(225, 131, 53, ${opacity})`

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  @media (min-width: 801px) {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
`

type ColourFnType = (?number) => mixed

export const stylesForButtonWithColour = (colourFn: ColourFnType) => css`
  background: ${colourFn()};
  transition: background 0.2s ease-in;
  &:hover {
    background: ${colourFn(1)};
  }
`
export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  display: block;
  font-size: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  color: #fff;
  background: ${green()};
  transition: background 0.2s ease-in;
  &:disabled {
    opacity: 0.5;
    &:hover {
      cursor: default;
    }
  }
  &:enabled&:hover {
    cursor: pointer;
    background: ${green(1)};
  }
`
