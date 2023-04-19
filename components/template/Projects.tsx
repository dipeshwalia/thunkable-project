import Content from "components/organisms/Content"
import Header from "components/organisms/Header"
import Head from "next/head"
import React from "react"
import styled from "styled-components"

const Body = styled.div`
  height: 100vh;
`
const ContentWrapper = styled.div<{ $empty?: boolean }>`
  background-color: ${(props) => (props.$empty ? "white" : "#F8F9FD")};
  padding-top: 40px;

`
const HeaderWrapper = styled.div<{ $empty?: boolean }>`
  background-color: ${(props) => (props.$empty ? "#F8F9FD" : "inherit")};
`
function Projects(props: {
  children: React.ReactNode
  title?: string
  empty?: boolean
}) {
  return (
    <Body>
      <Head>
        <title>{props.title || "Projects and Minions"}</title>
      </Head>
      <HeaderWrapper $empty>
        <Header />
      </HeaderWrapper>
      <ContentWrapper $empty>
        <Content>{props.children}</Content>
      </ContentWrapper>
    </Body>
  )
}

export default Projects
