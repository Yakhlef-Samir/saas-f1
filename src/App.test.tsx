import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders Vite + React + Tailwind heading', () => {
    render(<App />)
    const heading = screen.getByText('Vite + React + Tailwind')
    expect(heading).toBeInTheDocument()
  })

  it('renders count button with initial value', () => {
    render(<App />)
    const button = screen.getByText('count is 0')
    expect(button).toBeInTheDocument()
  })
})
