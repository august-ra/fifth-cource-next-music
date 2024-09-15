import ProgressBar from "./ProgressBar"

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"


describe("ProgressBar", () => {
  it("renders correctly", () => {
    render(<ProgressBar position={50} max={100} handleSeek={() => {}} />)

    const input = screen.getByDisplayValue(50)
    expect(input).toBeInTheDocument()
  })
})
