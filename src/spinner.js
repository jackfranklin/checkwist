import styled from 'styled-components'

import spinnerSvg from './spinner.svg'
// parceljs bug I think
const spinnerPath =
  process.env.NODE_ENV === 'development' ? `/dist${spinnerSvg}` : spinnerSvg

const Spinner = styled.img.attrs({
  src: spinnerPath,
})`
  display: block;
  margin: 20px auto;
`

export default Spinner
