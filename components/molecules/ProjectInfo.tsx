import { Typography } from "antd"
import Image from "next/image"
import styled from "styled-components"
import { ProjectItemType } from "components/organisms/ProjectList"

const ProjectNameWrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  padding: 10px;
  justify-content: space-between;
`
const Text = styled(Typography.Text)`
  margin: 0;
  font-size: 20px;
  color: #000;
  width: 120px;
  display: flex;
  justify-content: space-between;
  .ant-typography-edit {
    color: #8c8484b5;
  }
`
const ProjectAvatar = styled(Image)`
  margin-left: 10px;
  margin-right: 10px;
`

function ProjectInfo({
  project,
  onEdit,
}: {
  project: ProjectItemType
  onEdit?: ({ description, id }: { description: string; id: string }) => any
}) {
  return (
    <>
      <ProjectNameWrapper>
        <ProjectAvatar
          src="/assets/icons/default-project.png"
          alt="default-project-icon"
          width={40}
          height={40}
        />
        <Text
          editable={{
            onChange: (value: string) =>
              onEdit && onEdit({ description: value, id: project.id }),
          }}
        >
          {project.description}
        </Text>
      </ProjectNameWrapper>
      <Text>{new Date(project.createdAt).toLocaleDateString()}</Text>
    </>
  )
}

export default ProjectInfo
