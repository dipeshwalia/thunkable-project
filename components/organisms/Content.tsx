import React from "react"
import { PrimaryDivider } from "../atoms/Divider"
import Image from "next/image"
import styled from "styled-components"
import { IconButton } from "../atoms/Buttons"
import { Typography } from "antd"

const ContentWrapper = styled.div`
  padding-right: 50px;
  padding-left: 50px;
  // not matching with the design
  // background-color: #3D3A3A;
`

function Content(props: { children: React.ReactNode }) {
  return <ContentWrapper>{props.children}</ContentWrapper>
}

export default Content
