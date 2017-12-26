import styled from 'styled-components'

import spinnerSvg from './spinner.svg'

const Spinner = styled.img.attrs({
  src: spinnerSvg,
})`
  display: block;
  margin: 20px auto;
`

export default Spinner
