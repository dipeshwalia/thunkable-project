export const fetchResHelper = async (res: Response) => {
  if (!res.ok) {
    try {
      // try to read the error message from the response body
      const body = await res.json()
      throw { message: body.message, code: body.code }
    } catch (error: any) {
      // if we can't read the error message, throw the status text
      throw {
        message: error?.message ?? res.statusText,
        code: error.code || res.status,
      }
    }
  }
  return res
}
