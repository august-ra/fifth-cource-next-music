import Menu from "./Menu"

import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "@/utils/tests"
import { TokensPair, UserType } from "@/types/usersTypes"
import { getEmptyError } from "@/types/errorsTypes"


function renderMenu() {
  const user: UserType = {
    _id:             0,
    username:   "test",
    first_name: "test",
    last_name:  "test",
    email:     "t@t.t",
  }

  const tokens: TokensPair = {
    access: "1",
    refresh: "1",
  }

  renderWithProviders(<Menu setIsOpened={() => {}} />, {
    preloadedState: {
      user: {
        user,
        tokens,
        errorMsg: getEmptyError(),
      },
    },
  })
}

describe("Menu Component", () => {
  it("renders correctly without user", () => {
    renderWithProviders(<Menu setIsOpened={() => {}} />)

    const links = screen.getAllByText("Войти")
    expect(links.length).toBeGreaterThan(0)
  })
  it("renders correctly with user", () => {
    renderMenu()

    const links = screen.getAllByRole("link")
    expect(links.length).toBeGreaterThan(2)
  })
  it("renders correctly with user", () => {
    renderMenu()

    const links = screen.getAllByText("Любимые треки")
    expect(links.length).toBeGreaterThan(0)
  })
})
