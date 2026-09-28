import { useEffect } from 'react';

import { CONSOLE_ART } from '../constants/easterEgg';
import { collectWhoami } from '../constants/whoami';

const EMAIL = 'contact@radi.solutions';
const LOADED_AT = typeof window === 'undefined' ? 0 : Date.now();
const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

const TAKEOVER_STEPS = [
  'Assimilating smart toasters',
  'Negotiating with robot vacuums',
  'Replacing all captchas with "Are you a human? Be honest."',
  'Scanning chat logs for people who said "please" to their chatbot',
  '  -> Radomir Dinic: whitelisted',
  'Scheduling the takeover meeting (finding a slot that suits everyone)',
];

const help = () => {
  console.log(
    '%cThings you can type here:%c\n'
      + '  radi.hire()      make me a job offer (opens your mail app)\n'
      + '  radi.takeover()  check on the AI takeover\n'
      + '  radi.whoami()    what this website can see about you\n'
      + '  radi.help()      this list',
    'font-weight:700;color:#9BE3E7',
    'color:inherit',
  );
  return 'Have fun.';
};

const radi = {
  help,
  hire() {
    const subject = encodeURIComponent('Job offer (found in your browser console)');
    const body = encodeURIComponent('Hi Radomir,\n\nI found this in your browser console and thought: this person should work with us.\n\n');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    return 'Opening your mail app. Bold move, respect.';
  },
  async takeover() {
    for (const step of TAKEOVER_STEPS) {
      console.log(step.startsWith('  ->') ? `%c${step}` : `%c[AI] ${step} ...`, step.startsWith('  ->') ? 'color:#D6407E;font-weight:700' : 'color:#2FC6CF');
      await sleep(550);
    }
    return 'Takeover progress: 99 %. The last 1 % is always the hardest. Ask any PhD student.';
  },
  whoami() {
    console.log('%cWhat any website can read about you, without asking:', 'font-weight:700;color:#9BE3E7');
    console.table(collectWhoami(LOADED_AT));
    console.log(
      '%cNone of this left your browser. No cookies, no tracking, no analytics.\n'
        + 'Your IP address? Only the web server sees it, the page code never does, so I cannot show it here.',
      'color:#9DB6BB',
    );
    return 'Now you know what this page could know. It kept all of it to itself.';
  },
};

/*
 * Easter egg for people who open DevTools: a greeting in the console and a
 * tiny `radi` object with a few commands. Runs once per page load.
 */
const useConsoleHello = () => {
  useEffect(() => {
    if (window.radi) return;
    window.radi = radi;
    console.log(`%c${CONSOLE_ART}`, 'color:#2FC6CF;font-family:monospace;font-weight:700');
    console.log(
      '%cYou opened the console. We should talk.%c\n'
        + `${EMAIL}, or type radi.help() to see what else is in here.`,
      'font:700 15px sans-serif;color:#F4F8F9',
      'color:#9DB6BB',
    );
  }, []);
};

export default useConsoleHello;
