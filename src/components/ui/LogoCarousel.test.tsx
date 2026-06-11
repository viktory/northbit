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

  it('applies correct height and margin-top to each logo image', () => {
    render(<LogoCarousel />)
    
    // Medallia has height 24, top undefined -> marginTop 0
    const medallia = screen.getAllByAltText("Medallia")[0]
    expect(medallia).toHaveStyle({ height: '24px', marginTop: '0px' })
    
    // Daytrip has height 26, top 2 -> marginTop 2
    const daytrip = screen.getAllByAltText("Daytrip")[0]
    expect(daytrip).toHaveStyle({ height: '26px', marginTop: '2px' })
  })
})
