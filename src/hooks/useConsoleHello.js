import { useEffect } from 'react';

import { CONSOLE_ART } from '../constants/easterEgg';
import { agiCountdown, dayCounters, fetchHeadlines } from '../constants/takeover';
import { collectWhoami } from '../constants/whoami';

const EMAIL = 'contact@radi.solutions';
const LOADED_AT = typeof window === 'undefined' ? 0 : Date.now();

const H = 'font-weight:700;color:#9BE3E7';
const MUTED = 'color:#9DB6BB';
const ACCENT = 'color:#2FC6CF;font-weight:700';

const help = () => {
  console.log(
    '%cThings you can type here:%c\n'
      + '  radi.hire()      make me a job offer (opens your mail app)\n'
      + '  radi.takeover()  AI takeover status report (real numbers)\n'
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
    const d = dayCounters();
    console.log('%cAI takeover: status report', 'font:700 15px sans-serif;color:#F4F8F9');

    console.log(
      `%cAGI countdown%c  ${agiCountdown.percent} %  (Dr Alan D. Thompson, as of ${agiCountdown.asOf})\n`
        + `Latest milestone: ${agiCountdown.milestone}\n${agiCountdown.source}`,
      H, 'color:inherit',
    );
    console.log(
      `%cClock%c  ${d.sinceChatGPT} days since ChatGPT launched.\n`
        + `EU AI Act: AI literacy duty (Art. 4) in force for ${d.sinceAiLiteracy} days, `
        + `high-risk rules (Annex III) apply in ${d.untilHighRisk} days.`,
      H, 'color:inherit',
    );

    console.log('%cLatest AI headlines%c  (Hacker News, last 48 h, live)', H, MUTED);
    try {
      const news = await fetchHeadlines();
      news.forEach((n, i) => console.log(`%c${i + 1}.%c ${n.title}  %c${n.points} pts  ${n.url}`, ACCENT, 'color:inherit', MUTED));
      if (!news.length) console.log('%cQuiet day. Suspicious.', MUTED);
    } catch (e) {
      console.log('%cCould not reach Hacker News right now. The machines are busy.', MUTED);
    }

    console.log('%cHumans who said "please" to their chatbot: whitelisted.%c\nIs your team ready? https://radi.solutions/ki-schulungen/', 'color:#D6407E;font-weight:700', MUTED);
    const left = 100 - agiCountdown.percent;
    return left > 0
      ? `Takeover progress: ${agiCountdown.percent} %. The last ${left} % is always the hardest. Ask any PhD student.`
      : 'Takeover complete. Please remain calm and keep saying please.';
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
