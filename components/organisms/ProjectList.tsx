import update from "immutability-helper"
import { useCallback, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ProjectItemContainer from "./ProjectItem"
import { Project } from "pages/api/projects"

const ProjectList = (props: { projects: Project[] }) => {
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
          [hoverIndex, 0, prevCards[dragIndex] as Project],
        ],
      })
    })
  }, [])

  const renderCard = useCallback(
    (project: Project, index: number) => {
      return (
        <ProjectItemContainer
          key={project.id}
          index={index}
          project={project}
          moveCard={moveCard}
        />
      )
    },
    [moveCard]
  )

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {projects.map((card, i) => renderCard(card, i))}
      </DndProvider>
    </>
  )
}

export default ProjectList
