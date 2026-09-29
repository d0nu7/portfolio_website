import styled from 'styled-components';

import { BURGER } from './navMetrics';

const place = (size) => `
  width: ${size.width}px;
  height: ${size.height}px;
  right: ${size.right}px;
  top: ${size.top}px;
`;

export const BurgerButton = styled.button`
  position: fixed;
  z-index: 1001;
  ${place(BURGER.base)}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;

  span {
    display: block;
    height: 18%;
    border-radius: 2px;
    background: rgba(255, 255, 255, .75);
    transition: background-color .2s ease;
  }

  &:hover span { background: #fff; }
  &:focus-visible { outline: 3px solid var(--c-accent); outline-offset: 6px; }

  @media ${(p) => p.theme.breakpoints.sm} { ${place(BURGER.sm)} }
  @media ${(p) => p.theme.breakpoints.xs} { ${place(BURGER.xs)} }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1002;
  background: rgba(0, 0, 0, .4);
  opacity: ${(p) => (p.$open ? 1 : 0)};
  pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
  transition: opacity .25s ease;
`;

export const Panel = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1003;
  width: min(300px, 85vw);
  height: 100%;
  overflow-y: auto;
  padding: 72px 24px 32px;
  background: var(--c-surface-2);
  box-shadow: -12px 0 40px rgba(0, 0, 0, .35);
  transform: translateX(${(p) => (p.$open ? '0' : '100%')});
  visibility: ${(p) => (p.$open ? 'visible' : 'hidden')};
  transition: transform .3s ease, visibility 0s linear ${(p) => (p.$open ? '0s' : '.3s')};
`;

export const Close = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: none;
  color: rgba(255, 255, 255, .75);
  font-size: 30px;
  line-height: 1;
  cursor: pointer;

  &:hover { color: #fff; background: rgba(255, 255, 255, .06); }
  &:focus-visible { outline: 2px solid var(--c-accent); }
`;

export const PanelList = styled.ul`
  display: grid;
  gap: 2px;
`;

export const PanelLink = styled.a`
  display: block;
  padding: 11px 12px;
  border-radius: 10px;
  color: ${(p) => (p.$strong ? 'var(--c-text-strong)' : 'rgba(255, 255, 255, .75)')};
  font-size: 17px;
  font-weight: ${(p) => (p.$strong ? 800 : 600)};
  transition: color .2s ease, background-color .2s ease;

  &:hover { color: #fff; background: rgba(255, 255, 255, .05); }
  &:focus-visible { outline: 2px solid var(--c-accent); outline-offset: -2px; }
`;
