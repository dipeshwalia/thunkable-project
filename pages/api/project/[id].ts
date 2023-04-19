import { NextApiRequest, NextApiResponse } from "next"
import { saveToFile } from "utils/server/saveTofile"
import { fetchResHelper } from "utils/client/fetchResHelper"
import path from "path"
import { Project } from "../projects"
const projects = require("data/projects.json")

export const updateProject = async ({
  id,
  description,
}: {
  id: string
  description: string
}) => {
  const res = await fetch(`/api/project/${id}`, {
    method: "PUT",
    body: JSON.stringify({ description }),
  })

  return fetchResHelper(res)
}

export const deleteProject = async ({ id }: { id: string }) => {
  const res = await fetch(`/api/project/${id}`, {
    method: "DELETE",
  })

  return fetchResHelper(res)
}

export const createProject = async (description: string) => {
  const res = await fetch(`/api/project/new`, {
    method: "POST",
    body: JSON.stringify({ description }),
  })

  return fetchResHelper(res)
}

const findProject = (id: string): Project | null => {
  if (!id) return null
  return projects.find((project: any) => Number(project.id) === Number(id))
}

export default async function projectHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req

  const projectFilePath = path.join(process.cwd(), "data/projects.json")
  const { id } = req.query as { id: string }
  let project = findProject(id)

  switch (method) {
    case "POST":
      if (id !== "new") {
        res.status(405).end(`Method ${method} Not Allowed`)
        return
      }
      const { description: desc } = JSON.parse(req.body)
      if (!desc) {
        return res.status(400).json({
          message: "description is required",
          code: 400,
        })
      }
      const newId = Math.floor(Math.random() * 1000000)
      const newProject = {
        id: newId,
        description: desc,
        order: projects.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      projects.push(newProject)
      await saveToFile({ projects }, projectFilePath)

      res.status(200).json({
        message: "Project created successfully",
        code: 200,
      })
      break
    case "DELETE":
      console.log(project)
      if (!project) {
        res.status(404).end()
        return
      }
      let updateProjects = projects.filter(
        (project: any) => Number(project.id) !== Number(id)
      )
      await saveToFile({ projects: updateProjects }, projectFilePath)
      res.status(204)
      break
    case "PUT":
      if (!project) {
        res.status(404).end()
        return
      }
      const { description } = JSON.parse(req.body)
      if (!description) {
        return res.status(400).json({
          message: "description is required",
          code: 400,
        })
      }
      project.updatedAt = new Date().toISOString()

      Object.assign(project, { description })
      await saveToFile({ projects }, projectFilePath)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
