import styled from "styled-components"
import { Divider } from "antd"

const StyledDivider = styled(Divider)`
  margin: -23px 0 !important;
  .ant-divider-inner-text {
    padding: 0;
  }
`

export const PrimaryDivider = (props: { children: React.ReactNode }) => (
  <StyledDivider orientation="right">{props.children}</StyledDivider>
)
