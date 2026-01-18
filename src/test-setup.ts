import '@testing-library/jest-dom'
import { vi, beforeAll } from 'vitest'

// Mock Google Fonts to prevent network errors in tests
beforeAll(() => {
  // Mock document.head.appendChild to prevent font loading
  const originalAppendChild = document.head.appendChild
  document.head.appendChild = vi.fn((element: any): any => {
    // Prevent font link elements from being added
    if (element instanceof HTMLLinkElement && element.href.includes('fonts.googleapis.com')) {
      return element
    }
    return originalAppendChild.call(document.head, element)
  })
})
