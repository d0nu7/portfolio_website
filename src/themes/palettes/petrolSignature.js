// "Petrol Signature": the Deep Petrol base, plus the cyan-to-magenta
// gradient used exactly once, on the primary call to action. Serious
// overall, with one recognisable mark.
const SIGNATURE = 'linear-gradient(90deg, #2FC6CF 0%, #D6407E 100%)';

const petrolSignature = {
  name: 'petrolSignature',
  colors: {
    bg: '#0A1518',
    bgDeep: '#071013',
    surface: '#10222A',
    surface2: '#16303A',
    text: '#E3ECEE',
    textStrong: '#F4F8F9',
    ink: '#0A1518',

    accent: '#2FC6CF',
    accentSoft: '#9BE3E7',
    accentInk: '#062326',
    accent2: '#D6407E',
    accent3: '#1D8A96',
    onAccent: '#062326',

    label: '#8FCBD1',
    rule: '#D6407E',
    link: '#5ED3DA',
    chipBg: '#16303A',
    chipBgHover: '#3A1B2B',
    chipText: '#CFE3E6',
    tagText: '#9DB6BB',

    lightPanel: '#EEF5F4',
    lightAccent: '#13707A',
    lightLink: '#A3285E',

    module1: '#2FC6CF',
    module2: '#D6407E',
    module3: '#1D8A96',
    module4: '#3FA98A',
    module5: '#C9A45C',
    module6: '#4F87B5',
  },
  fills: {
    ctaFront: SIGNATURE,
    ctaBack: '#2FC6CF',
    ctaAltFront: '#D6407E',
    ctaAltBack: '#2FC6CF',
    divider: '#2FC6CF',
    dividerAlt: '#D6407E',
    skillsGlow: 'none',

    trainingHero: '#10222A',
    trainingHeroRing: 'rgba(214,64,126,.16)',
    trainingPrimary: SIGNATURE,
    trainingPrimaryText: '#062326',
    featuredCard: '#14323B',
    moduleCard: 'rgba(255,255,255,.035)',
    actPanel: '#EEF5F4',
    actPanelRing: 'rgba(214,64,126,.08)',
    finalCta: '#0F6E78',
    processNumber: '#D6407E',
  },
  titleGradient: null,
  timelineTitleGradient: null,
};

export default petrolSignature;
