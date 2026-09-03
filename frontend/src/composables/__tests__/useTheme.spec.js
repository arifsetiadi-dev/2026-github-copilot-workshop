import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';
import { useTheme } from '../useTheme';

function setupDom() {
  document.documentElement.removeAttribute('data-theme');
}

function mockMatchMedia(isDark) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: isDark && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('useTheme', () => {
  beforeEach(() => {
    setupDom();
    localStorage.clear();
    mockMatchMedia(false);
  });

  it('defaults to light theme when no preference is stored', () => {
    const { isDark } = useTheme();
    expect(isDark.value).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('applies dark theme when localStorage has dark', () => {
    localStorage.setItem('theme', 'dark');
    const { isDark } = useTheme();
    expect(isDark.value).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('applies dark theme when system prefers dark and nothing is stored', () => {
    mockMatchMedia(true);
    const { isDark } = useTheme();
    expect(isDark.value).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles theme and persists to localStorage', async () => {
    const { isDark, toggleTheme } = useTheme();
    expect(isDark.value).toBe(false);
    toggleTheme();
    await nextTick();
    expect(isDark.value).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles back to light theme', async () => {
    localStorage.setItem('theme', 'dark');
    const { isDark, toggleTheme } = useTheme();
    expect(isDark.value).toBe(true);
    toggleTheme();
    await nextTick();
    expect(isDark.value).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
