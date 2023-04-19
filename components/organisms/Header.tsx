import React from "react"
import { PrimaryDivider } from "../atoms/Divider"
import Image from "next/image"
import styled from "styled-components"
import { IconButton } from "../atoms/Buttons"
import { Typography } from "antd"
import { useRouter } from "next/router"

const HeaderAppButton = styled(IconButton)``

const ImageWrapper = styled(Image)`
  cursor: pointer;
  margin-top: 20px;
`

const HeaderWrapper = styled.div`
  padding-right: 50px;
  padding-left: 50px;
`

function Header() {
  const router = useRouter()
  return (
    <>
      <HeaderWrapper>
        <ImageWrapper
          src="/assets/logo.png"
          alt="logo"
          onClick={() => router.push("/")}
          width={40}
          height={40}
        />
        <Typography.Title  level={3}>
          My Projects
        </Typography.Title>
      </HeaderWrapper>
      <PrimaryDivider>
        <HeaderAppButton
          icon={"plus"}
          onClick={() => router.push("/projects/add")}
          size="large"
        />
      </PrimaryDivider>
    </>
  )
}

export default Header
