import update from "immutability-helper"
import { useCallback, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ProjectItemContainer from "./ProjectItem"

export type ProjectItemType = {
  id: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

const ProjectList = (props: { projects: ProjectItemType[] }) => {
  const [projects, setProjects] = useState(
    props.projects.sort(function (a, b) {
      return a.order - b.order
    })
  )
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setProjects((prevCards) => {
      return update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as ProjectItemType],
        ],
      })
    })
  }, [])

  const renderCard = useCallback((project: ProjectItemType, index: number) => {
    return (
      <ProjectItemContainer
        key={project.id}
        index={index}
        project={project}
        moveCard={moveCard}
      />
    )
  }, [])

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {projects.map((card, i) => renderCard(card, i))}
      </DndProvider>
    </>
  )
}

export default ProjectList
