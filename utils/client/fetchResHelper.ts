export async function fetchResHelper<T>({
  url,
  method = "GET",
  body,
}: {
  url: string
  method?: string
  body?: string
}): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body
      ? {
          body,
        }
      : undefined),
  })
  if (!res.ok) {
    try {
      // try to read the error message from the response body
      const body = await res.json()
      throw { message: body.message, code: body.code }
    } catch (error: any) {
      // if we can't read the error message, throw the status text
      throw {
        message: error?.message ?? res.statusText,
        code: Number(error.code || res.status),
      }
    }
  } else {
    return res.json()
  }
}
