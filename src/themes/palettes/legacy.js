// The palette the site shipped with until 2026-09: orange / cyan / violet
// on navy, inherited from the original portfolio template.
// Kept so the token refactor can be verified as a visual no-op and as a
// reference point when comparing the alternatives.
const legacy = {
  name: 'legacy',
  colors: {
    bg: '#0F1624',
    bgDeep: '#0E131F',
    surface: '#182232',
    surface2: '#212D45',
    text: 'hsl(204,23.8%,95.9%)',
    textStrong: '#FFFFFF',
    ink: '#0F1624',

    accent: '#13ADC7',
    accentSoft: '#8BDBE8',
    accentInk: '#08232A',
    accent2: '#945DD6',
    accent3: '#F46737',
    onAccent: '#FFFFFF',

    label: '#9CC9E3',
    rule: '#D0BB57',
    link: '#5165FF',
    chipBg: '#6B3030',
    chipBgHover: '#801414',
    chipText: '#D4C0C0',
    tagText: '#D8BFBF',

    lightPanel: '#FFFAF1',
    lightAccent: '#24788A',
    lightLink: '#4F4A9C',

    module1: '#13ADC7',
    module2: '#945DD6',
    module3: '#F46737',
    module4: '#2F946D',
    module5: '#C94B78',
    module6: '#3E7BD6',
  },
  // Every value below is a full CSS <image> or <color>. A palette can use a
  // flat colour wherever it does not want a gradient.
  fills: {
    ctaFront: 'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)',
    ctaBack: 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)',
    ctaAltFront: 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)',
    ctaAltBack: 'linear-gradient(270deg, #ff622e 0%, #B133FF 100%)',
    divider: 'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)',
    dividerAlt: 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)',
    skillsGlow: 'radial-gradient(50% 50% at 50% 50%, rgba(79, 108, 176, 0.25) 53.8%, rgba(79, 108, 176, 0) 100%)',

    trainingHero: 'radial-gradient(circle at 88% 14%, rgba(148,93,214,.34), transparent 29%), radial-gradient(circle at 75% 90%, rgba(19,173,199,.19), transparent 31%), linear-gradient(145deg, #182232, #0f1624 65%)',
    trainingHeroRing: 'rgba(244,103,55,.19)',
    trainingPrimary: 'linear-gradient(120deg, #F46737, #945DD6)',
    trainingPrimaryText: '#FFFFFF',
    featuredCard: 'linear-gradient(155deg, rgba(19,173,199,.16), rgba(148,93,214,.1)), #182232',
    moduleCard: 'linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018))',
    actPanel: 'radial-gradient(circle at 100% 0%, rgba(148,93,214,.15), transparent 36%), radial-gradient(circle at 0% 100%, rgba(19,173,199,.1), transparent 34%), #FFFAF1',
    actPanelRing: 'rgba(244,103,55,.08)',
    finalCta: 'linear-gradient(120deg, rgba(244,103,55,.92), rgba(148,93,214,.9))',
    processNumber: '#F46737',
  },
  // Section titles fade from white to 66 % white. Set to null for solid text.
  titleGradient: 'linear-gradient(121.57deg, #FFFFFF 18.77%, rgba(255, 255, 255, 0.66) 60.15%)',
  timelineTitleGradient: 'linear-gradient(121.57deg, #FFFFFF 10%, rgba(255, 255, 255, 0.66) 30.15%)',
};

export default legacy;
