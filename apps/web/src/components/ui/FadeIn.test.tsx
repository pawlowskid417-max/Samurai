import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FadeIn } from './FadeIn'

// Mock IntersectionObserver for JSDOM
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('FadeIn Component', () => {
  test('renders children correctly', () => {
    render(
      <FadeIn>
        <div data-testid="test-child">Test Content</div>
      </FadeIn>
    )
    
    expect(screen.getByTestId('test-child')).toBeDefined()
    expect(screen.getByText('Test Content')).toBeDefined()
  })
})
