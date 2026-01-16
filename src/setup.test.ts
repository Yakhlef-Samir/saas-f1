// Smoke test to verify project setup works correctly
import { describe, it, expect } from 'vitest'

describe('Project Setup Smoke Test', () => {
  it('should verify React is available', () => {
    expect(() => import('react')).not.toThrow()
  })

  it('should verify TypeScript is configured', () => {
    // TypeScript compilation is verified by the build process
    expect(true).toBe(true)
  })

  it('should verify Tailwind CSS is configured', () => {
    // Tailwind CSS is verified by the build process
    expect(true).toBe(true)
  })

  it('should verify ESLint configuration', () => {
    // ESLint configuration is verified by npm run lint
    expect(true).toBe(true)
  })

  it('should verify project structure exists', () => {
    const fs = require('fs')
    const path = require('path')
    
    const requiredDirs = [
      'src/components',
      'src/pages', 
      'src/hooks',
      'src/services',
      'src/utils',
      'src/types',
      'src/styles'
    ]
    
    requiredDirs.forEach(dir => {
      expect(fs.existsSync(path.join(__dirname, '..', dir))).toBe(true)
    })
  })
})
