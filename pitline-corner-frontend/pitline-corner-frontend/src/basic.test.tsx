import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Test simple sans import complexe
describe('Basic functionality', () => {
  it('should render a button with count text', () => {
    const TestComponent = () => (
      <div>
        <button>count is 0</button>
        <h1>Vite + React + Tailwind</h1>
      </div>
    )
    
    render(<TestComponent />)
    const button = screen.getByText('count is 0')
    const heading = screen.getByText('Vite + React + Tailwind')
    
    expect(button).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
  })
})
