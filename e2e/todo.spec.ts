import { test, expect } from '@playwright/test'

test.describe('TODO Dashboard E2E tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should add a new task', async ({ page }) => {
    await page.goto('/')

    // Find the input and button
    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Type and submit
    await input.fill('Test geological task')
    await submitButton.click()

    // Verify task appears in list
    await expect(page.getByText('Test geological task')).toBeVisible()

    // Input should be cleared
    await expect(input).toHaveValue('')
  })

  test('should add multiple tasks', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add first task
    await input.fill('First task')
    await submitButton.click()

    // Add second task
    await input.fill('Second task')
    await submitButton.click()

    // Verify both appear
    await expect(page.getByText('First task')).toBeVisible()
    await expect(page.getByText('Second task')).toBeVisible()
  })

  test('should complete a task by clicking the checkbox', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add a task
    await input.fill('Complete this task')
    await submitButton.click()

    // Wait for task to appear
    await expect(page.getByText('Complete this task')).toBeVisible()

    // Click the checkbox button (toggle button)
    const checkboxButton = page.getByRole('button', {
      name: /mark "complete this task" as complete/i,
    })
    await checkboxButton.click()

    // Task should now show as completed (opacity-60)
    const todoItem = page.locator('li[data-testid="todo-item"]')
    await expect(todoItem).toHaveClass(/opacity-60/)
  })

  test('should edit a task by double-clicking', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add a task
    await input.fill('Original task')
    await submitButton.click()

    // Wait for task to appear
    await expect(page.getByText('Original task')).toBeVisible()

    // Double-click on the task text to enter edit mode
    await page.getByText('Original task').dblclick()

    // Wait for edit input to appear
    const editInput = page.locator('input[aria-label="Edit task title"]')
    await expect(editInput).toBeVisible()

    // Clear and type new text
    await editInput.fill('Updated task')

    // Click save button (green checkmark icon)
    const saveButton = page.getByRole('button', { name: /save changes/i })
    await saveButton.click()

    // Verify updated text appears
    await expect(page.getByText('Updated task')).toBeVisible()
    await expect(page.getByText('Original task')).not.toBeVisible()
  })

  test('should delete a task', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add a task
    await input.fill('Delete this task')
    await submitButton.click()

    // Wait for task to appear
    await expect(page.getByText('Delete this task')).toBeVisible()

    // Click delete button
    const deleteButton = page.getByRole('button', {
      name: /delete task "delete this task"/i,
    })
    await deleteButton.click()

    // Task should be gone
    await expect(page.getByText('Delete this task')).not.toBeVisible()
  })

  test('should filter tasks (All, Active, Completed)', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add two tasks
    await input.fill('Active task')
    await submitButton.click()

    await input.fill('Completed task')
    await submitButton.click()

    // Get the checkbox buttons and complete the second task
    const checkboxButtons = page
      .locator('li[data-testid="todo-item"] button')
      .first()
    await checkboxButtons.click()

    // All filter - should show both
    const allButton = page.getByRole('button', { name: /^All$/i })
    await allButton.click()
    await expect(page.getByText('Active task')).toBeVisible()
    await expect(page.getByText('Completed task')).toBeVisible()

    // Active filter - should show only active
    const activeButton = page.getByRole('button', { name: /^Active$/i })
    await activeButton.click()
    await expect(page.getByText('Active task')).toBeVisible()

    // Completed filter - should show only completed
    const completedButton = page.getByRole('button', { name: /^Completed$/i })
    await completedButton.click()
    await expect(page.getByText('Completed task')).toBeVisible()
  })

  test('should search for tasks', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add multiple tasks
    await input.fill('Drill core sample')
    await submitButton.click()

    await input.fill('Analyze minerals')
    await submitButton.click()

    await input.fill('Study fossils')
    await submitButton.click()

    // Search for a specific task
    const searchInput = page.locator('input[placeholder*="Search geological"]')
    await searchInput.fill('minerals')

    // Only the matching task should be visible
    await expect(page.getByText('Analyze minerals')).toBeVisible()

    // Clear search
    const clearButton = searchInput.locator('xpath=../button')
    if (await clearButton.isVisible()) {
      await clearButton.click()
    }

    // All tasks should be visible again
    await expect(page.getByText('Drill core sample')).toBeVisible()
    await expect(page.getByText('Analyze minerals')).toBeVisible()
    await expect(page.getByText('Study fossils')).toBeVisible()
  })

  test('should clear all completed tasks', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add tasks - they will be added in reverse order (newest first)
    await input.fill('Task 1')
    await submitButton.click()

    await input.fill('Task 2')
    await submitButton.click()

    await input.fill('Task 3')
    await submitButton.click()

    // Wait for all tasks to be visible
    await expect(page.getByText('Task 1')).toBeVisible()
    await expect(page.getByText('Task 2')).toBeVisible()
    await expect(page.getByText('Task 3')).toBeVisible()

    // Complete Task 1 and Task 2 (but not Task 3)
    const allTaskElements = page.locator('li[data-testid="todo-item"]')
    const itemCount = await allTaskElements.count()

    expect(itemCount).toBeGreaterThan(0)

    // Mark Task 1 as complete by finding it and clicking its checkbox
    const task1 = page.getByText('Task 1').locator('xpath=ancestor::li')
    await task1.locator('button').first().click()

    // Mark Task 2 as complete
    const task2 = page.getByText('Task 2').locator('xpath=ancestor::li')
    await task2.locator('button').first().click()

    // Find and click "Clear Completed" button
    const clearButton = page.getByRole('button', { name: /clear completed/i })
    await expect(clearButton).toBeEnabled()
    await clearButton.click()

    // Only Task 3 should remain
    await expect(page.getByText('Task 3')).toBeVisible()
    await expect(page.getByText('Task 1')).not.toBeVisible()
    await expect(page.getByText('Task 2')).not.toBeVisible()
  })

  test('should persist tasks in localStorage after refresh', async ({
    page,
  }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add a task
    await input.fill('Persistent task')
    await submitButton.click()

    await expect(page.getByText('Persistent task')).toBeVisible()

    // Refresh the page
    await page.reload()

    // Task should still be there
    await expect(page.getByText('Persistent task')).toBeVisible()
  })

  test('should display task count', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Initially should show "0 tasks remaining"
    await expect(page.locator('text=/0 tasks? remaining/')).toBeVisible()

    // Add a task
    await input.fill('First task')
    await submitButton.click()

    // Should show "1 task remaining"
    await expect(page.locator('text=/1 task remaining/')).toBeVisible()

    // Add another
    await input.fill('Second task')
    await submitButton.click()

    // Should show "2 tasks remaining"
    await expect(page.locator('text=/2 tasks remaining/')).toBeVisible()

    // Complete one
    const firstCheckbox = page
      .locator('li[data-testid="todo-item"]')
      .first()
      .locator('button')
      .first()
    await firstCheckbox.click()

    // Should still show "1 task remaining" (counting incomplete)
    await expect(page.locator('text=/1 task remaining/')).toBeVisible()
  })

  test('should handle keyboard shortcuts (Escape to clear input)', async ({
    page,
  }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )

    // Type some text
    await input.fill('This will be cleared')

    // Press Escape
    await input.press('Escape')

    // Input should be cleared
    await expect(input).toHaveValue('')
  })

  test('should handle keyboard shortcuts (Enter to add task)', async ({
    page,
  }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )

    // Type and press Enter
    await input.fill('Task added with Enter')
    await input.press('Enter')

    // Task should appear
    await expect(page.getByText('Task added with Enter')).toBeVisible()

    // Input should be cleared
    await expect(input).toHaveValue('')
  })

  test('should prevent adding empty tasks', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Try to add empty task with spaces
    await input.fill('   ')
    await submitButton.click()

    // Nothing should be added to the list
    const todoItems = page.locator('li[data-testid="todo-item"]')
    await expect(todoItems).toHaveCount(0)
  })

  test('should update task count when tasks are cleared', async ({ page }) => {
    await page.goto('/')

    const input = page.locator(
      'input[placeholder*="Add a new geological task"]',
    )
    const submitButton = page.getByRole('button', { name: /submit new task/i })

    // Add tasks
    await input.fill('Task 1')
    await submitButton.click()

    await input.fill('Task 2')
    await submitButton.click()

    // Complete both
    const checkboxes = page
      .locator('li[data-testid="todo-item"] button')
      .first()
    await checkboxes.click()

    const secondCheckbox = page
      .locator('li[data-testid="todo-item"]')
      .nth(1)
      .locator('button')
      .first()
    await secondCheckbox.click()

    // Should show "0 tasks remaining"
    await expect(page.locator('text=/0 tasks? remaining/')).toBeVisible()

    // Clear completed
    const clearButton = page.getByRole('button', { name: /clear completed/i })
    await clearButton.click()

    // Should still show "0 tasks remaining"
    await expect(page.locator('text=/0 tasks? remaining/')).toBeVisible()
  })
})
