import type { AppProps } from "next/app"
import "antd/dist/reset.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Router from "next/router"
import { useEffect, useState } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function MyProjectsApp({ Component, pageProps }: AppProps) {
  const [_loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyProjectsApp
