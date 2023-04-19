import Projects from "components/template/Projects"
import { useGetProjects } from "pages/api/projects"
import ProjectList from "components/organisms/ProjectList"

export default function Home() {
  const { data: projects = [], isLoading, isFetching } = useGetProjects()

  return (
    <Projects title="View and Edit Projects">
      {projects.length === 0 && !isLoading && !isFetching ? (
        <>No projects found, Please Create One</>
      ) : isLoading || isFetching ? (
        <> Loading ...</>
      ) : (
        <ProjectList projects={projects} />
      )}
    </Projects>
  )
}
