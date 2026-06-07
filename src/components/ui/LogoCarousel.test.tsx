import { render, screen } from '@testing-library/react'
import { LogoCarousel } from './LogoCarousel'

describe('LogoCarousel', () => {
  it('renders all logos twice for seamless loop', () => {
    render(<LogoCarousel />)
    
    const logos = ["Medallia", "Daytrip", "HelpCrunch", "SoftServe", "GreenIce"]
    
    logos.forEach(logo => {
      // Check by title attribute which we added to the div wrapper
      const elements = screen.getAllByTitle(logo)
      expect(elements).toHaveLength(2)
    })
  })
})
