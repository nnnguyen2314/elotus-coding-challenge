// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for jsdom environment
class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = jest.fn((target?: Element) => {
    // Immediately trigger intersecting to simplify tests
    const entry: Partial<IntersectionObserverEntry> = {
      isIntersecting: true,
      target: (target || ({} as Element)) as Element,
      intersectionRatio: 1,
    };
    // @ts-ignore
    this.callback([entry], this as any);
  });
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
  root: Element | Document | null = null;
  rootMargin = '';
  thresholds = [0];
}

// @ts-ignore
global.IntersectionObserver = MockIntersectionObserver as any;

// jsdom doesn't implement scrollTo; stub it to avoid errors
// @ts-ignore
window.scrollTo = jest.fn();
