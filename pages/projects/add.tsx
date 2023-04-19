import { Alert, Input } from "antd"
import Projects from "components/template/Projects"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { createProject } from "pages/api/project/[id]"
import { useRouter } from "next/router"

const { Search } = Input

export default function Home() {
  const router = useRouter()

  const createMutation = useMutation<
    any,
    any,
    any,
    {
      message: string
    }
  >(createProject, {
    onSuccess: () => {
      return router.push("/")
    },
  })

  const handleCreateProject = (description: string) => {
    createMutation.reset()
    createMutation.mutate(description)
  }

  return (
    <Projects>
      <div
        style={{
          padding: "10px",
        }}
      >
        {createMutation.isSuccess && (
          <Alert message="Project created" type="success" />
        )}
        {createMutation.isError && (
          <Alert
            message={createMutation.error.message}
            type="warning"
            closable
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          justifySelf: "center",
          border: "1px solid #000",
          padding: "10px",
        }}
      >
        <Image
          src="/assets/icons/default-project.png"
          alt="default-project-icon"
          width={40}
          height={40}
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            border: "1px solid #000",
          }}
        />

        <Search
          placeholder="Name your project"
          enterButton="Create"
          loading={createMutation.isLoading}
          onSearch={handleCreateProject}
          disabled={createMutation.isLoading}
          size="large"
          style={{ width: "400px" }}
        />
      </div>
    </Projects>
  )
}
