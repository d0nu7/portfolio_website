/*
 * radi.whoami(): shows what any website can read about a visitor without
 * asking. Everything is read locally from browser APIs; nothing is sent
 * anywhere or stored. (That is also why there is no IP address: page code
 * never sees it, only the web server does.)
 */

const browserName = (ua) => {
  const rules = [
    [/Edg\//, 'Edge'], [/OPR\//, 'Opera'], [/Firefox\//, 'Firefox'],
    [/SamsungBrowser\//, 'Samsung Internet'], [/Chrome\//, 'Chrome'], [/Safari\//, 'Safari'],
  ];
  const hit = rules.find(([re]) => re.test(ua));
  return hit ? hit[1] : 'something exotic';
};

const osName = (ua, platform) => {
  if (/iPhone|iPad|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'iOS / iPadOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac OS X|Macintosh/.test(ua)) return 'macOS';
  if (/CrOS/.test(ua)) return 'ChromeOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'unknown';
};

const gpu = () => {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'not telling (good browser)';
  } catch (e) {
    return 'not telling (good browser)';
  }
};

const referrer = () => {
  if (!document.referrer) return 'typed it in, bookmark, or a privacy-minded browser';
  try {
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? 'from another page on this site' : host;
  } catch (e) {
    return 'somewhere';
  }
};

export const collectWhoami = (pageLoadedAt) => {
  const ua = navigator.userAgent;
  const mq = (q) => window.matchMedia(q).matches;
  const conn = navigator.connection;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const seconds = Math.round((Date.now() - pageLoadedAt) / 1000);

  return {
    Browser: browserName(ua),
    'Operating system': osName(ua, navigator.platform),
    Languages: (navigator.languages || [navigator.language]).join(', '),
    'Time zone': tz,
    'Your local time': new Date().toLocaleTimeString(),
    Screen: `${window.screen.width} x ${window.screen.height} @ ${window.devicePixelRatio}x`,
    Window: `${window.innerWidth} x ${window.innerHeight}`,
    'CPU threads': navigator.hardwareConcurrency || 'unknown',
    'Memory (rough)': navigator.deviceMemory ? `${navigator.deviceMemory} GB or more` : 'not telling',
    'Graphics card': gpu(),
    Touchscreen: navigator.maxTouchPoints > 0 ? `yes (${navigator.maxTouchPoints} points)` : 'no',
    'Dark mode': mq('(prefers-color-scheme: dark)') ? 'yes, of course' : 'no (bold)',
    'Reduced motion': mq('(prefers-reduced-motion: reduce)') ? 'yes' : 'no',
    Connection: conn && conn.effectiveType ? `${conn.effectiveType}${conn.saveData ? ', data saver on' : ''}` : 'not telling',
    'Came from': referrer(),
    'Time on this page': `${seconds} s`,
  };
};
