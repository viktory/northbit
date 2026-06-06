import { render, screen } from '@testing-library/react'
import { LogoCarousel } from './LogoCarousel'

describe('LogoCarousel', () => {
  it('renders all logos twice for seamless loop', () => {
    render(<LogoCarousel />)
    
    // Each logo should appear twice
    const logos = ["GOOGLE", "STRIPE", "META", "NETFLIX", "APPLE"]
    
    logos.forEach(logo => {
      const elements = screen.getAllByText(logo)
      expect(elements).toHaveLength(2)
    })
  })
})
