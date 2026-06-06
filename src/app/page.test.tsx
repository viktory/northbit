import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Page', () => {
  it('renders the main hero heading', () => {
    render(<Page />)

    const heading = screen.getByText(/Solving complex problems with/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the logo carousel items', () => {
    render(<Page />)
    const google = screen.getAllByText(/GOOGLE/i)[0]
    expect(google).toBeInTheDocument()
  })
})
