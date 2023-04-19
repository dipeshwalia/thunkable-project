import { useRef } from "react"
import type { Identifier, XYCoord } from "dnd-core"
import { useDrag, useDrop } from "react-dnd"
import { ProjectItemType } from "./ProjectList"
import { deleteProject, updateProject } from "../../pages/api/project/[id]"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import styled from "styled-components"
import { Button, Popconfirm } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import ProjectInfo from "components/molecules/ProjectInfo"

const ProjectItemCrudWrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  border: 1px solid #000;
  padding: 10px;
  justify-content: space-between;
`
const style = {
  marginBottom: ".5rem",
  cursor: "move",
}

type DragItem = {
  index: number
  id: string
  type: string
}

function ProjectItemCrud({ project }: { project: ProjectItemType }) {
  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
  const queryClient = useQueryClient()

  const handleUpdateProject = ({
    description,
    id,
  }: {
    description: string
    id: string
  }) => {
    updateMutation.reset()
    updateMutation.mutate({
      description,
      id,
    })
  }
  const handleDeleteProject = ({ id }: { id: string }) => {
    deleteMutation.mutate({
      id,
    })
  }
  return (
    <ProjectItemCrudWrapper>
      <ProjectInfo project={project} onEdit={handleUpdateProject} />

      <Popconfirm
        title="Delete this project?"
        // @ts-ignore-next-line
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => {
          handleDeleteProject({
            id: project.id,
          })
        }}
      >
        <Button icon={<DeleteOutlined />} />
      </Popconfirm>
    </ProjectItemCrudWrapper>
  )
}

function ProjectItemContainer({
  index,
  moveCard,
  project,
}: {
  index: number
  project: ProjectItemType
  moveCard: (dragIndex: number, hoverIndex: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "project",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "project",
    item: () => {
      return { id: project.id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <ProjectItemCrud project={project} />
    </div>
  )
}

export default ProjectItemContainer
