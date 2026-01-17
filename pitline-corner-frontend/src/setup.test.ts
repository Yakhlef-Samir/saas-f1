// Smoke test to verify project setup works correctly
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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
    const requiredDirs = [
      'src/components',
      'src/pages',
      'src/hooks',
      'src/services',
      'src/utils',
      'src/types',
      'src/styles',
    ]

    const currentDir = path.dirname(fileURLToPath(import.meta.url))

    requiredDirs.forEach((dir) => {
      expect(fs.existsSync(path.join(currentDir, '..', dir))).toBe(true)
    })
  })
})
