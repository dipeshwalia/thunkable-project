import type { AppProps } from "next/app"
import "antd/dist/reset.css"

function ThunkableApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default ThunkableApp
