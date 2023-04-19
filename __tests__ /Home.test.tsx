import { expect, test, vi } from "vitest"
import { render, within, screen } from "./../test-utils"
import Home from "../pages"

vi.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    }
  },
}))

test("home", () => {
  render(<Home />)
  const main = within(screen.getByText("My Projects"))
  expect(main).toBeDefined()
})
