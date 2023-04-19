import { NextApiResponse, NextApiRequest } from "next"

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{
    status: string
  }>
) {
  return res.status(200).json({
    status: "ok",
  })
}
