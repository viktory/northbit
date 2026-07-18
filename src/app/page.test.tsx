import { render, screen } from '@testing-library/react'
import Page from './page'

jest.mock('components', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
  THEMES: { EDITORIAL: 'editorial' },
  Link: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>,
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  Pill: ({ children, leftIcon, className }: { children: React.ReactNode, leftIcon?: React.ReactNode, className?: string }) => (
    <div data-testid="pill" className={className}>
      {leftIcon}
      {children}
    </div>
  ),
}))

describe('Page', () => {
  it('renders the main hero heading', () => {
    render(<Page />)

    const heading = screen.getByText(/Solving complex problems with/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the logo carousel items', () => {
    render(<Page />)
    const medallia = screen.getAllByTitle(/Medallia/i)[0]
    expect(medallia).toBeInTheDocument()
  })
})
