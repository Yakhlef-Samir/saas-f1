import { test, expect } from '@playwright/test'

test.describe('User Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('should display F1 design elements', async ({ page }) => {
    // Check for F1 background animation
    const track = page.locator('div').filter({ hasText: '' }).first()
    await expect(track).toBeVisible()
    
    // Check for F1 fonts
    await expect(page.locator('h2')).toContainText('Grille de Départ')
    
    // Check for F1 colors
    const title = page.locator('h2')
    await expect(title).toHaveCSS('text-shadow', 'rgb(220, 0, 0) 3px 3px 0px')
  })

  test('should show password strength indicator', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]')
    await passwordInput.fill('weak')
    
    // Should show password strength indicator
    await expect(page.locator('#password-strength')).toBeVisible()
    await expect(page.locator('text=Code faible')).toBeVisible()
    
    // Fill strong password
    await passwordInput.fill('StrongP@ss123!')
    await expect(page.locator('text=Code fort')).toBeVisible()
  })

  test('should register successfully with valid data', async ({ page }) => {
    const timestamp = Date.now()
    const email = `test${timestamp}@example.com`
    
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.fill('input[name="password_confirm"]', 'TestPassword123!')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Should show success animation
    await expect(page.locator('text=Victoire !')).toBeVisible()
    await expect(page.locator('text=Bienvenue sur la grille de départ')).toBeVisible()
    
    // Should redirect after 2 seconds
    await page.waitForTimeout(2500)
    await expect(page).toHaveURL('/')
  })

  test('should show error for existing email', async ({ page }) => {
    // Mock API response for existing email
    await page.route('**/auth/register', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            code: 'EMAIL_EXISTS',
            message: 'Cet email est déjà utilisé'
          }
        })
      })
    })
    
    await page.fill('input[name="email"]', 'existing@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.fill('input[name="password_confirm"]', 'TestPassword123!')
    
    await page.click('button[type="submit"]')
    
    // Should show error message
    const errorElement = page.locator('#email-error')
    await expect(errorElement).toBeVisible()
    await expect(errorElement).toContainText('Cet email est déjà utilisé')
  })

  test('should validate password confirmation', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.fill('input[name="password_confirm"]', 'DifferentPassword')
    
    // Button should be disabled
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeDisabled()
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check ARIA labels
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-label', 'Email du pilote')
    await expect(page.locator('input[name="password"]')).toHaveAttribute('aria-label', 'Mot de passe')
    await expect(page.locator('input[name="password_confirm"]')).toHaveAttribute('aria-label', 'Confirmation du mot de passe')
    
    // Check ARIA describedby
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-describedby', 'email-error')
    await expect(page.locator('input[name="password"]')).toHaveAttribute('aria-describedby', 'password-strength')
    
    // Check error message has proper role
    await page.fill('input[name="email"]', 'invalid-email')
    const errorElement = page.locator('#email-error')
    await expect(errorElement).toHaveAttribute('role', 'alert')
    await expect(errorElement).toHaveAttribute('aria-live', 'polite')
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if form is properly sized
    const form = page.locator('form').first()
    const formBox = await form.boundingBox()
    expect(formBox?.width).toBeLessThan(400)
    
    // Check if all elements are visible
    await expect(page.locator('h2')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('input[name="password_confirm"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })
})
