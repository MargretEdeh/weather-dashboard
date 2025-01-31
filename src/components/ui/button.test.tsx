import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "../ui/button"
import React from "react"

describe("Button", () => {
  it("renders button with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button.className).toContain("bg-primary")
    expect(button.className).toContain("text-primary-foreground")
    expect(button.className).toContain("h-10 px-4 py-2")
  })

  it("renders button with custom variant and size", () => {
    render(
      <Button variant="destructive" size="sm">
        Delete
      </Button>,
    )
    const button = screen.getByRole("button", { name: /delete/i })
    expect(button.className).toContain("bg-destructive")
    expect(button.className).toContain("text-destructive-foreground")
    expect(button.className).toContain("h-9 rounded-md px-3")
  })

  it("renders as child when asChild prop is true", () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>,
    )
    const link = screen.getByRole("link", { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link.className).toContain("inline-flex items-center justify-center rounded-md")
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole("button", { name: /custom button/i })
    expect(button.className).toContain("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("renders disabled button", () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole("button", { name: /disabled button/i })
    expect(button).toBeDisabled()
    expect(button.className).toContain("disabled:pointer-events-none")
    expect(button.className).toContain("disabled:opacity-50")
  })

  it("renders icon button", () => {
    render(<Button size="icon" aria-label="Icon Button" />)
    const button = screen.getByRole("button", { name: /icon button/i })
    expect(button.className).toContain("h-10 w-10")
  })

  it("renders link variant", () => {
    render(<Button variant="link">Link Style</Button>)
    const button = screen.getByRole("button", { name: /link style/i })
    expect(button.className).toContain("text-primary")
    expect(button.className).toContain("underline-offset-4")
    expect(button.className).toContain("hover:underline")
  })
})

