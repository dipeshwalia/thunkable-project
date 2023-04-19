import { NextApiRequest, NextApiResponse } from "next"
import { useQuery } from "@tanstack/react-query"
import { fetchResHelper } from "utils/client/fetchResHelper"

export type Project = {
  id: string | number
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

import data from "data/projects.json"
let projects: Project[] = data

const listProject = async () => {
  const res = await fetch(`/api/projects`, {
    method: "GET",
  })

  const data = await fetchResHelper(res)
  return data.json()
}

export const useGetProjects = () =>
  useQuery<any, any>(["projects"], listProject)

export default async function getAnalysisAPI(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  const { method } = req
  if (method !== "GET") return res.status(404).end()

  return res.status(200).json(projects)
}
