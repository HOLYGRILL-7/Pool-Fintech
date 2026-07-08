/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  dark: {
    background: '#0D1F1A',
    card: '#162820',
    border: '#1E3328',
    primary: '#F59E0B',       // amber — CTAs, highlights, active states
    secondary: '#2ECC71',     // bright green — amounts, success, paid states
    textPrimary: '#FFFFFF',
    textSecondary: '#8BA89E', // muted gray-green

    // Compatibility aliases
    text: '#FFFFFF',
    backgroundElement: '#162820',
    backgroundSelected: '#1E3328',
  },
  light: {
    background: '#F0F4F8',
    card: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#F59E0B',
    secondary: '#0D9488',
    textPrimary: '#0A1628',
    textSecondary: '#6B7280',

    // Compatibility aliases
    text: '#0A1628',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E5E7EB',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
