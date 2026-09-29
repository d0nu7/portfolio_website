import palette from './palette';

const defaultTheme = {
  palette,
  // Fonts (self-hosted via @fontsource, see styles/fonts.css)
  fonts: {
    title: "Space Grotesk, sans-serif",
    main: "Space Grotesk, sans-serif"
  },
  // Colors for layout
  colors: {
    primary1: palette.colors.text,
    background1: palette.colors.bg,
  },
  // Breakpoints for responsive design.
  // Declare them in descending order (xl -> xs) inside a component so the
  // narrower query always wins the cascade.
  breakpoints: {
    xs: 'screen and (max-width: 480px)',
    sm: 'screen and (max-width: 640px)',
    md: 'screen and (max-width: 768px)',
    lg: 'screen and (max-width: 1024px)',
    xl: 'screen and (max-width: 1280px)'
  },
}

export default defaultTheme
