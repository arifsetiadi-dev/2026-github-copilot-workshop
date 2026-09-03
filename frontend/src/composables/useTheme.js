import { ref } from 'vue';

const STORAGE_KEY = 'theme';

function readInitialDark() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') {
      return true;
    }
    if (stored === 'light') {
      return false;
    }
  } catch {
    // ignore storage errors
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useTheme() {
  const isDark = ref(readInitialDark());
  applyTheme(isDark.value);

  function applyTheme(dark) {
    isDark.value = dark;
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }

  function toggleTheme() {
    applyTheme(!isDark.value);
  }

  return {
    isDark,
    toggleTheme,
  };
}
