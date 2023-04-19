import { Button } from "antd"
import Image from "next/image"
import styled from "styled-components"

const PrimaryIconButton = styled(Button)`
  background-color: #3d3a4f;
  border-color: #3d3a4f;
  width: ${(props) => (props.size === "large" ? "60px !important" : undefined)};
  height: ${(props) =>
    props.size === "large" ? "60px !important" : undefined};
  .ant-btn-default {
    &:hover {
      border-color: red;
    }
  }
`

type Icons = "plus" | "minus" | "delete" | "edit" | "save" | "cancel"

type IconProps = {
  onClick: () => void
  icon: Icons
  style?: React.CSSProperties
  className?: string
  size?: "large" | "small" | "middle" | undefined
  shape?: "circle" | "round" | undefined
  type?: "primary" | "default" | "dashed" | "link" | "text" | undefined
}

const iconMapper = (props: { icons: Icons }) => {
  switch (props.icons) {
    case "plus":
      return (
        <Image
          src={"/assets/icons/plus-sign.svg"}
          alt="add"
          width={30}
          height={30}
        />
      )
    default:
      return null
  }
}

export const IconButton = (props: IconProps) => {
  return (
    <PrimaryIconButton
      type={props.type || "default"}
      onClick={props.onClick}
      shape={props.shape || "circle"}
      icon={iconMapper({ icons: "plus" })}
      size={props.size}
    />
  )
}
