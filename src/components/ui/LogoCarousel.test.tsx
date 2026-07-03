import { render, screen } from '@testing-library/react'
import { LogoCarousel } from './LogoCarousel'

// Mock the 'components' library to avoid a broken require path in its dist files
jest.mock('components', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
}))

describe('LogoCarousel', () => {
  it('renders all logos', () => {
    render(<LogoCarousel />)
    
    const logos = ["Medallia", "Daytrip", "HelpCrunch", "SoftServe", "GreenIce"]
    
    logos.forEach(logo => {
      // Check by title attribute which we added to the div wrapper
      const elements = screen.getAllByTitle(logo)
      expect(elements).toHaveLength(1)
    })
  })
})
