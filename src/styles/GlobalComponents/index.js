import styled, { css } from 'styled-components'

// Section titles either fade (palette.titleGradient) or are solid text.
export const titleFill = (gradient) => gradient
  ? css`
    background: ${gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `
  : css`
    color: var(--c-text-strong);
  `;

// Sections fade in on scroll (see hooks/useReveal); pass `$noreveal` to opt out.
export const Section = styled.section.attrs((props) => ({ 'data-reveal': props.$noreveal ? undefined : '' }))`
  display: ${(props) => props.grid ? "grid" : "flex" };
  flex-direction: ${(props) => props.row ? "row" : "column" };
  padding: ${(props) => props.nopadding ? "0" : "32px 48px 0" } ;
  margin: 0 auto;
  max-width: 1040px;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;

  @media ${(props) => props.theme.breakpoints.md} {
    padding: ${(props) => props.nopadding ? "0" : "24px 48px 0" };
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    /* The hero grid stacks: text full width, decorative animation hidden. */
    grid-template-columns: minmax(0, 1fr);
    ${(props) => props.grid && '> :nth-child(2) { display: none; }'}
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: ${(props) => props.nopadding ? "0" : "16px 16px 0" } ;
  }
`

export const SectionTitle = styled.h2`
  font-weight: 800;
  font-size: ${(props) => props.main ? '65px' : '56px'};
  line-height: ${(props) => props.main ? '72px' : '56px'};
  width: max-content;
  max-width: 100%;
  ${(props) => titleFill(props.theme.palette.titleGradient)}
  margin-bottom: 16px;
  padding: ${(props) => props.main ? '0 0 16px' : '0'};

  @media ${props => props.theme.breakpoints.md}{
    font-size: ${(props) => props.main ? '56px' : '48px'};
    line-height: ${(props) => props.main ? '56px' : '48px'};
    margin-bottom: 12px;
    padding: ${(props) => props.main ? '0 0 12px' : '0'};
  }

  @media ${props => props.theme.breakpoints.sm}{
    font-size: 32px;
    line-height: 40px;
    font-size: ${(props) => props.main ? '38px' : '32px'};
    line-height: ${(props) => props.main ? '42px' : '40px'};
    margin-bottom: 8px;
    padding: ${(props) => props.main ? '0 0 8px' : '0'};
    max-width: 100%;
  }
`

export const SectionText = styled.p`
  max-width: 800px;
  font-size: 24px;
  line-height: 40px;
  font-weight: 300;
  padding-bottom: 3.6rem;
  color: rgba(255, 255, 255, 0.5);

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 670px;
    font-size: 20px;
    line-height: 32px;
    padding-bottom: 24px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 16px;
  }
`

export const SectionDivider = styled.div`

  width: 64px;
  height: 6px;
  border-radius: 10px;
  background: ${(props) => props.colorAlt ? 'var(--fill-divider-alt)' : 'var(--fill-divider)'};

    margin: ${(props) => props.divider ? "4rem 0" : "" };

  @media ${(props) => props.theme.breakpoints.md} {
    width: 48px;
    height: 4px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 32px;
    height: 2px;
  }
`
export const Eyebrow = styled.p`
  margin-bottom: 16px;
  color: var(--c-accent-soft);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 12px;
    margin-bottom: 10px;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 80px;

  @media ${(props) => props.theme.breakpoints.md} {
    margin-bottom: 64px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
    margin-bottom: 40px;
  }
`

/*
 * The site's one button. `primary` uses the palette's CTA fill (the
 * cyan-to-magenta signature in Petrol Signature) and cross-fades to the
 * hover fill; `secondary` is an outline. Same size, radius and motion as the
 * buttons on the training page.
 */
export const ButtonLink = styled.a`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 26px;
  border-radius: 999px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  transition: transform .2s ease, border-color .2s ease, background-color .2s ease;

  ${({ variant }) => variant === 'secondary' ? `
    color: var(--c-text-strong);
    border: 1px solid rgba(255, 255, 255, .22);
    background-color: rgba(255, 255, 255, .04);

    &:hover { border-color: var(--c-accent); background-color: rgba(255, 255, 255, .08); }
  ` : `
    color: var(--c-on-accent);
    background: var(--fill-cta-front);

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background: var(--fill-cta-back);
      opacity: 0;
      transition: opacity .25s ease;
    }
    &:hover::before { opacity: 1; }
  `}

  &:hover { transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  &:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--c-accent) 60%, transparent);
    outline-offset: 3px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    min-height: 48px;
    font-size: 15px;
    white-space: normal;
    text-align: center;
  }
`

/*
 * Shared card surface for every boxed element on the homepage (teaching,
 * achievements, projects), so they share one radius, border and hover.
 */
export const cardSurface = css`
  background: var(--c-surface);
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
`

export const cardHover = css`
  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--c-accent) 45%, transparent);
    box-shadow: 0 18px 40px rgba(0, 0, 0, .28);
  }
`

