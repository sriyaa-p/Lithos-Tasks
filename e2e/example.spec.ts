import { test, expect } from '@playwright/test'

test.describe('Lithos TODO Dashboard UI E2E tests', () => {
  // Test 1: Page load
  test('should load page with TODO dashboard and navbar', async ({ page }) => {
    await page.goto('/')

    // Check navbar
    await expect(page.getByLabel('Lithos home')).toBeVisible()
    await expect(page.getByRole('link', { name: /lithos home/i })).toBeVisible()

    // Check TODO dashboard elements
    const heading = page.getByRole('heading', { name: /lithos tasks/i })
    await expect(heading).toBeVisible()

    await expect(page.locator('input[placeholder*="Add a new"]')).toBeVisible()
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()
  })

  // Test 2: Responsive layout (mobile vs desktop)
  test('should adjust layout responsively', async ({ page }) => {
    // Desktop view check
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    await expect(page.getByText('Course')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible()
    await expect(page.getByLabel('Toggle navigation menu')).toBeHidden()

    // Mobile view check
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await expect(page.getByText('Course')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeHidden()
    await expect(page.getByLabel('Toggle navigation menu')).toBeVisible()

    // Open mobile menu
    await page.getByLabel('Toggle navigation menu').click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  // Test 3: Cursor spotlight movement (desktop only)
  test('should update mask-image on mouse movement', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')

    const revealLayer = page.locator('[data-testid="reveal-layer-div"]')
    await expect(revealLayer).toBeVisible()

    // Before movement, it shouldn't show mask yet or it shows default hidden mask
    const initialMask = await revealLayer.evaluate(
      (el) =>
        window.getComputedStyle(el).webkitMaskImage ||
        window.getComputedStyle(el).maskImage,
    )

    // Hover mouse to middle of viewport
    await page.mouse.move(600, 400)
    await page.waitForTimeout(100) // wait for lerp

    // After movement, a base64 mask URL should be injected
    const updatedMask = await revealLayer.evaluate(
      (el) =>
        window.getComputedStyle(el).webkitMaskImage ||
        window.getComputedStyle(el).maskImage,
    )

    expect(updatedMask).not.toBe(initialMask)
    expect(updatedMask).toContain('data:image/png;base64')
  })

  // Test 4: Mobile shows reveal image fully
  test('should show full reveal image on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const revealLayer = page.locator('[data-testid="reveal-layer-div"]')
    await expect(revealLayer).toBeVisible()

    // On mobile/touch, maskImage should be removed
    const maskStyle = await revealLayer.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        maskImage: style.maskImage,
        webkitMaskImage: style.webkitMaskImage,
      }
    })

    // Should have no mask or default hidden mask (since isMobileOrTouch)
    expect(
      maskStyle.maskImage === 'none' || maskStyle.maskImage === 'initial',
    ).toBeTruthy()
  })
})
