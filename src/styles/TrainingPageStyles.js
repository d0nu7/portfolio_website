import styled from "styled-components";

export const Page = styled.div`
  /* Colours come from the site palette (src/themes/palette.js). */
  --radi-navy: var(--c-bg);
  --radi-panel: var(--c-surface);
  --radi-cyan: var(--c-accent);
  --radi-cream: var(--c-light-panel);
  color: #f5f7fa;
`;

export const Shell = styled.div`
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;

  @media ${(props) => props.theme.breakpoints.sm} {
    width: min(100% - 32px, 1120px);
  }
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  margin-top: 12px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 34px;
  padding: clamp(48px, 8vw, 92px);
  background: var(--fill-training-hero);
  box-shadow: 0 28px 90px rgba(0,0,0,.24);

  &::after {
    content: "";
    position: absolute;
    width: 360px;
    height: 360px;
    right: -170px;
    bottom: -230px;
    border: 65px solid var(--fill-training-hero-ring);
    border-radius: 50%;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    border-radius: 23px;
    padding: 42px 24px;
  }
`;

export const Eyebrow = styled.p`
  margin: 0 0 17px;
  color: var(--c-accent-soft);
  font-size: 12px;
  line-height: 1.3;
  letter-spacing: .14em;
  font-weight: 700;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  position: relative;
  z-index: 1;
  max-width: 850px;
  margin: 0;
  font-size: clamp(42px, 7vw, 76px);
  line-height: .98;
  letter-spacing: -.055em;
  color: white;
`;

export const HeroCopy = styled.p`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 26px 0 0;
  color: rgba(255,255,255,.68);
  font-size: clamp(18px, 2vw, 23px);
  line-height: 1.55;
  font-weight: 300;
`;

export const Actions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 35px;
`;

const ActionBase = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  border-radius: 999px;
  padding: 0 23px;
  font-size: 16px;
  font-weight: 700;
  transition: transform .18s ease, background .18s ease;

  &:hover { transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid color-mix(in srgb, var(--c-accent) 55%, transparent); outline-offset: 3px; }
`;

export const PrimaryAction = styled(ActionBase)`
  color: var(--fill-training-primary-text);
  background: var(--fill-training-primary);
`;

export const SecondaryAction = styled(ActionBase)`
  border: 1px solid rgba(255,255,255,.2);
  color: #fff;
  background: rgba(255,255,255,.055);

  &:hover { background: rgba(255,255,255,.1); }
`;

export const TrustRow = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 760px;
  margin-top: 54px;

  div {
    border-top: 1px solid rgba(255,255,255,.13);
    padding-top: 14px;
  }

  strong { display: block; color: white; font-size: 16px; }
  span { display: block; margin-top: 5px; color: rgba(255,255,255,.43); font-size: 12px; line-height: 1.4; }

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    margin-top: 40px;
  }
`;

export const References = styled.p`
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 22px 0 0;
  color: rgba(255,255,255,.55);
  font-size: 13px;
  line-height: 1.5;
`;

export const Section = styled.section.attrs({ 'data-reveal': '' })`
  padding: clamp(76px, 10vw, 120px) 0 0;
`;

export const SectionHeading = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(300px, .7fr);
  gap: 54px;
  align-items: end;
  margin-bottom: 34px;

  h2 {
    max-width: 700px;
    margin: 0;
    color: white;
    font-size: clamp(35px, 5vw, 54px);
    line-height: 1.05;
    letter-spacing: -.045em;
  }

  p {
    margin: 0 0 4px;
    color: rgba(255,255,255,.57);
    font-size: 17px;
    line-height: 1.6;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media ${(props) => props.theme.breakpoints.lg} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media ${(props) => props.theme.breakpoints.sm} { grid-template-columns: 1fr; }
`;

export const PriceCard = styled.article`
  position: relative;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ featured }) => featured ? "color-mix(in srgb, var(--c-accent) 55%, transparent)" : "rgba(255,255,255,.1)"};
  border-radius: 22px;
  padding: 25px;
  background: ${({ featured }) => featured ? "var(--fill-featured-card)" : "rgba(255,255,255,.035)"};
  box-shadow: ${({ featured }) => featured ? "0 20px 50px color-mix(in srgb, var(--c-accent) 11%, transparent)" : "none"};

  h3 { margin: 0; color: white; font-size: 22px; }
  > p { min-height: 68px; margin: 13px 0 0; color: rgba(255,255,255,.5); font-size: 14px; line-height: 1.55; }
  ul { display: grid; gap: 10px; margin: 23px 0; padding: 0; }
  li { position: relative; padding-left: 18px; color: rgba(255,255,255,.7); font-size: 13px; line-height: 1.4; }
  li::before { content: ""; position: absolute; top: .47em; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--radi-cyan); }
`;

export const Recommended = styled.span`
  position: absolute;
  top: -14px;
  right: 17px;
  z-index: 2;
  border: 4px solid var(--radi-navy);
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--c-accent-ink);
  background: var(--c-accent-soft);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;
`;

export const Price = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,.1);

  span { display: block; color: rgba(255,255,255,.4); font-size: 10px; text-transform: uppercase; letter-spacing: .1em; }
  strong { display: block; margin-top: 5px; color: white; font-size: 32px; letter-spacing: -.04em; }
  small { display: block; margin-top: 3px; color: rgba(255,255,255,.38); font-size: 10px; }
`;

export const PricingNote = styled.p`
  margin: 18px 3px 0;
  color: rgba(255,255,255,.4);
  font-size: 12px;
  line-height: 1.55;
`;

export const AddOnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;

  div { border-radius: 15px; padding: 16px 18px; background: rgba(255,255,255,.045); }
  strong { display: block; color: white; font-size: 14px; }
  span { display: block; margin-top: 5px; color: rgba(255,255,255,.45); font-size: 12px; line-height: 1.45; }

  @media ${(props) => props.theme.breakpoints.md} { grid-template-columns: 1fr; }
`;

export const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media ${(props) => props.theme.breakpoints.md} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media ${(props) => props.theme.breakpoints.sm} { grid-template-columns: 1fr; }
`;

export const ModuleCard = styled.article`
  min-height: 218px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 20px;
  padding: 25px;
  background: var(--fill-module-card);

  > span { display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; color: white; background: ${({ accent }) => accent}; font-size: 11px; font-weight: 800; }
  h3 { margin: 18px 0 9px; color: white; font-size: 19px; line-height: 1.2; }
  p { margin: 0; color: rgba(255,255,255,.48); font-size: 13px; line-height: 1.55; }
`;

export const ActPanel = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  border: 1px solid rgba(255,255,255,.5);
  border-radius: 28px;
  padding: clamp(28px, 6vw, 60px);
  color: var(--radi-navy);
  background: var(--fill-act-panel);
  box-shadow: 0 28px 80px rgba(0,0,0,.14);

  &::after {
    content: "";
    position: absolute;
    width: 210px;
    height: 210px;
    right: -125px;
    bottom: -135px;
    border: 38px solid var(--fill-act-panel-ring);
    border-radius: 50%;
  }

  > div:first-child {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, .75fr);
    gap: 12px 54px;
    align-items: end;
  }

  > div:first-child > p:first-child {
    grid-column: 1 / -1;
    margin: 0 0 3px;
    color: var(--c-light-accent);
  }

  h2 { max-width: 690px; margin: 0; font-size: clamp(34px, 4.6vw, 52px); line-height: 1.04; letter-spacing: -.05em; }
  > div:first-child > p:last-child { max-width: 520px; margin: 0 0 2px; color: #52606f; font-size: 15px; line-height: 1.68; }

  @media ${(props) => props.theme.breakpoints.md} {
    > div:first-child { grid-template-columns: 1fr; gap: 12px; }
    > div:first-child > p:first-child { grid-column: auto; }
    > div:first-child > p:last-child { margin-top: 8px; }
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    border-radius: 23px;
    padding: 34px 22px;
  }
`;

export const ActChecklist = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  div { min-height: 126px; border: 1px solid rgba(15,22,36,.09); border-radius: 16px; padding: 18px; background: rgba(255,255,255,.7); box-shadow: 0 8px 24px rgba(30,46,61,.05); }
  strong { display: block; color: #17202c; font-size: 14px; line-height: 1.25; }
  span { display: block; margin-top: 7px; color: #687486; font-size: 12px; line-height: 1.5; }

  @media ${(props) => props.theme.breakpoints.lg} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media ${(props) => props.theme.breakpoints.sm} { grid-template-columns: 1fr; }
`;

export const LegalNote = styled.p`
  position: relative;
  z-index: 1;
  grid-column: 1 / -1;
  margin: -2px 0 0 !important;
  border-top: 1px solid rgba(15,22,36,.1);
  padding-top: 17px;
  font-size: 11px !important;
  line-height: 1.5 !important;
  color: #7c8793 !important;

  a { color: var(--c-light-link); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }
`;

export const ProcessGrid = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 11px;
  margin: 0;
  padding: 0;

  li { min-height: 190px; border-top: 1px solid rgba(255,255,255,.16); padding: 20px 6px 0; }
  span { color: var(--fill-process-number); font-size: 11px; font-weight: 800; letter-spacing: .1em; }
  h3 { margin: 15px 0 8px; color: white; font-size: 18px; }
  p { margin: 0; color: rgba(255,255,255,.47); font-size: 13px; line-height: 1.55; }

  @media ${(props) => props.theme.breakpoints.md} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media ${(props) => props.theme.breakpoints.sm} { grid-template-columns: 1fr; }
`;

export const FaqList = styled.div`
  display: grid;
  gap: 9px;

  details { border: 1px solid rgba(255,255,255,.09); border-radius: 14px; padding: 0 19px; background: rgba(255,255,255,.03); }
  summary { padding: 18px 0; color: white; font-size: 15px; font-weight: 600; cursor: pointer; }
  p { max-width: 850px; margin: -2px 0 18px; color: rgba(255,255,255,.52); font-size: 13px; line-height: 1.65; }
`;

export const FinalCta = styled.section.attrs({ 'data-reveal': '' })`
  position: relative;
  overflow: hidden;
  margin: clamp(80px, 11vw, 130px) 0 0;
  border-radius: 28px;
  padding: clamp(34px, 7vw, 68px);
  text-align: center;
  background: var(--fill-final-cta);

  h2 { max-width: 760px; margin: 0 auto; color: white; font-size: clamp(34px, 5vw, 52px); line-height: 1.05; letter-spacing: -.045em; }
  p { max-width: 650px; margin: 18px auto 28px; color: rgba(255,255,255,.78); font-size: 16px; line-height: 1.6; }
  ${PrimaryAction} { color: var(--radi-navy); background: white; }
`;

export const Transparency = styled.p`
  max-width: 820px;
  margin: 25px auto 0;
  color: rgba(255,255,255,.31);
  font-size: 10px;
  line-height: 1.55;
  text-align: center;
`;
