import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  ACTS,
  ACT_STYLE,
  LANGS,
  MODES,
  Q37,
  SECRET_AT_INDEX,
  SKIP_TOKENS,
  TOTAL_QUESTIONS,
  actIndexFor,
  classifySecretAsked,
  pick,
  questionAt,
  starterFor,
} from '../../constants/closer';
import COPY from '../../constants/closerCopy';
import CloserInstallHint from './CloserInstallHint';
import {
  ActNumeral,
  ActTitle,
  Bar,
  Body,
  Button,
  CloserGlobal,
  Choice,
  Count,
  Counter,
  Elapsed,
  Field,
  Flash,
  Foot,
  GhostButton,
  Kicker,
  LangSwitch,
  Lede,
  Question,
  Row,
  Screen,
  Sheet,
  SheetPanel,
  Small,
  Stay,
  StayDot,
  TextButton,
  Toggle,
  Tokens,
  TopBar,
  Track,
  TurnBadge,
  TurnName,
  TurnVerb,
  TwistLabel,
  VisuallyHidden,
  Wordmark,
} from './CloserStyles';

const STORAGE_KEY = 'closer:v1';
const ACT_MS = 15 * 60 * 1000;
const ENDING_BEATS = ['endingOne', 'endingTwo', 'endingThree', 'endingFour'];

/*
 * Nothing about the conversation is stored -- answers are never typed in. What
 * persists is only enough to survive a closed tab.
 */
const initialState = {
  phase: 'start',
  lang: 'de',
  players: ['', ''],
  modeId: MODES[0].id,
  timerEnabled: true,
  qIndex: 0,
  pending: 0,
  breakAct: 0,
  skipsRemaining: SKIP_TOKENS,
  secretReady: [false, false],
  secretAsked: [null, null],
  starterOffset: 0,
  actStartedAt: null,
  completed: false,
};

function loadSaved() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || !saved.phase) return null;
    if (saved.phase === 'start' || saved.completed) return null;
    return { ...initialState, ...saved };
  } catch (err) {
    return null;
  }
}

function buzz(pattern) {
  if (typeof window === 'undefined') return;
  if (typeof window.navigator?.vibrate === 'function') {
    try {
      window.navigator.vibrate(pattern);
    } catch (err) {
      /* vibration is a nicety, never a requirement */
    }
  }
}

function clockOf(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export default function CloserGame() {
  const [mounted, setMounted] = useState(false);
  const [resumable, setResumable] = useState(null);
  const [s, setS] = useState(initialState);

  // Screen-local state: none of this is worth persisting.
  const [step, setStep] = useState('ask'); // twist | counting | ask | deeper | deeperOpen
  const [count, setCount] = useState(0);
  const [skipAsking, setSkipAsking] = useState(false);
  const [justSkipped, setJustSkipped] = useState(null);
  const [staying, setStaying] = useState(false);
  const [stayReady, setStayReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [beat, setBeat] = useState(0);
  const [now, setNow] = useState(0);
  // A per-second speaking live region would be disruptive, so the countdown
  // only ever announces twice -- once when it starts, once at zero -- via
  // this offscreen polite region, never a per-tick aria-live on the number
  // itself (see Counter below, which stays a plain, non-live element).
  const [announce, setAnnounce] = useState('');

  const set = useCallback((patch) => setS((prev) => ({ ...prev, ...patch })), []);

  const lang = s.lang;
  const t = useCallback((key) => pick(COPY[key], lang), [lang]);
  const tf = useCallback((key, ...args) => COPY[key](lang, ...args), [lang]);

  // Render the server markup first, then look for a saved game, so the static
  // export and the first client render stay identical. The resume screen
  // (and a straight "Continue game") should come back in whatever language
  // the saved game was in, not silently fall back to German -- the language
  // toggle on this screen still lets someone switch before continuing.
  useEffect(() => {
    setMounted(true);
    const saved = loadSaved();
    setResumable(saved);
    if (saved) set({ lang: saved.lang });
  }, [set]);

  useEffect(() => {
    if (!mounted || s.phase === 'start') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch (err) {
      /* private mode, quota, whatever -- the game still works */
    }
  }, [s, mounted]);

  // Keep the screen awake while the phone is lying between two people.
  const wakeRef = useRef(null);
  useEffect(() => {
    const playing = mounted && s.phase !== 'start' && !s.completed;
    if (!playing || typeof navigator === 'undefined' || !navigator.wakeLock) return undefined;
    let cancelled = false;
    navigator.wakeLock
      .request('screen')
      .then((lock) => {
        if (cancelled) lock.release().catch(() => {});
        else wakeRef.current = lock;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      wakeRef.current?.release().catch(() => {});
      wakeRef.current = null;
    };
  }, [mounted, s.phase, s.completed]);

  // CLOSER switches language within the same route, so the static lang
  // attribute _document.js sets at build time can't track it -- keep it
  // honest for screen readers and translation tools.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang === 'de' ? 'de' : 'en';
  }, [lang]);

  useEffect(() => {
    if (!s.timerEnabled || !s.actStartedAt) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    setNow(Date.now());
    return () => clearInterval(id);
  }, [s.timerEnabled, s.actStartedAt]);

  const mode = useMemo(
    () => MODES.find((m) => m.id === s.modeId) || MODES[0],
    [s.modeId]
  );
  const actIdx = actIndexFor(s.qIndex);
  const style = ACT_STYLE[actIdx];
  const question = questionAt(s.qIndex);
  const isLast = s.qIndex === TOTAL_QUESTIONS - 1;

  const nameOf = useCallback(
    (i) =>
      (s.players[i] || '').trim() || (i === 0 ? t('playerOne') : t('playerTwo')),
    [s.players, t]
  );

  // Strict alternation, so the same person never has to open twice running.
  const starter = starterFor(s.qIndex, s.starterOffset);

  const twist = question?.twist && mode.twists[question.twist] ? question.twist : null;
  const canStay = Boolean(question?.stayEnabled && mode.twists.stay);

  const enterQuestion = useCallback((index, state) => {
    const q = questionAt(index);
    const m = MODES.find((x) => x.id === state.modeId) || MODES[0];
    const tw = q?.twist && m.twists[q.twist] ? q.twist : null;
    // 'deeper' is a post-answer twist; the rest open with a lead-in screen.
    setStep(tw && tw !== 'deeper' ? 'twist' : 'ask');
    setSkipAsking(false);
    setJustSkipped(null);
    setStaying(false);
    setStayReady(false);
  }, []);

  /*
   * Everything between questions routes through here. Act breaks, the secret
   * question and the staged last question all interrupt on the way past.
   */
  const goTo = useCallback(
    (index, patch = {}) => {
      const base = { ...s, ...patch };
      if (index >= TOTAL_QUESTIONS) {
        set({ ...patch, phase: 'all36' });
        return;
      }
      if (index > 0 && index % 12 === 0) {
        buzz([18, 60, 18]);
        set({ ...patch, phase: 'break', breakAct: index / 12 - 1, pending: index });
        return;
      }
      if (index === SECRET_AT_INDEX && !base.secretReady[0]) {
        set({ ...patch, phase: 'secretPass1', pending: index });
        return;
      }
      if (index === TOTAL_QUESTIONS - 1) {
        buzz(20);
        set({ ...patch, phase: 'lastIntro', pending: index });
        return;
      }
      set({ ...patch, phase: 'q', qIndex: index });
      enterQuestion(index, base);
    },
    [s, set, enterQuestion]
  );

  const leaveQuestion = useCallback(() => {
    if (twist === 'deeper' && step !== 'deeper' && step !== 'deeperOpen') {
      setStep('deeper');
      return;
    }
    goTo(s.qIndex + 1);
  }, [twist, step, goTo, s.qIndex]);

  // BOTH / NO THINKING lead-in count. The question itself is already on
  // screen for the whole count -- see the 'counting' step below -- so this
  // only ever gates when answering starts, never whether the question is
  // known yet.
  const countRef = useRef(null);
  const flipRef = useRef(null);
  const runCountdown = useCallback((from) => {
    setCount(from);
    setStep('counting');
    setAnnounce(tf('countdownStart', from));
    clearInterval(countRef.current);
    countRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(countRef.current);
          buzz(20);
          // A beat on zero -- long enough to register as "now", short enough
          // not to feel like a pause -- before the question screen's own
          // controls (Next, Stay, Skip) become available.
          clearTimeout(flipRef.current);
          flipRef.current = setTimeout(() => setStep('ask'), 400);
          setAnnounce(t('countdownGo'));
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [t, tf]);
  useEffect(() => () => {
    clearInterval(countRef.current);
    clearTimeout(flipRef.current);
  }, []);

  // STAY hides the game. CONTINUE appears once, quietly, and then waits as
  // long as it has to -- no timer, nothing counting down.
  useEffect(() => {
    if (!staying) return undefined;
    setStayReady(false);
    const id = setTimeout(() => setStayReady(true), 6000);
    return () => clearTimeout(id);
  }, [staying]);

  // A skip is the one action that spends something, so it gets a beat of its
  // own rather than silently swapping the question out.
  useEffect(() => {
    if (justSkipped === null) return undefined;
    const id = setTimeout(() => {
      setJustSkipped(null);
      goTo(s.qIndex + 1);
    }, 1600);
    return () => clearTimeout(id);
  }, [justSkipped, goTo, s.qIndex]);

  // The closing sequence plays itself out, one line at a time.
  useEffect(() => {
    if (s.phase !== 'ending' || beat >= ENDING_BEATS.length - 1) return undefined;
    const id = setTimeout(() => setBeat((b) => b + 1), 2000);
    return () => clearTimeout(id);
  }, [s.phase, beat]);

  const [revealSecond, setRevealSecond] = useState(false);
  useEffect(() => {
    if (s.phase !== 'all36') return undefined;
    setRevealSecond(false);
    const id = setTimeout(() => setRevealSecond(true), 1600);
    return () => clearTimeout(id);
  }, [s.phase]);

  const restart = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
    setResumable(null);
    setConfirmReset(false);
    setBeat(0);
    setStep('ask');
    setS((prev) => ({ ...initialState, lang: prev.lang }));
  }, []);

  const elapsed = s.actStartedAt && now ? now - s.actStartedAt : 0;
  const overtime = s.timerEnabled && s.actStartedAt && elapsed > ACT_MS;
  const pct = Math.round((s.qIndex / (TOTAL_QUESTIONS - 1)) * 100);

  const frame = (content, opts = {}) => (
    <Screen $accent={opts.accent || style.accent} $glow={opts.glow ?? style.glow}>
      <CloserGlobal />
      {content}
    </Screen>
  );

  const A0 = ACT_STYLE[0].accent;

  /* ================================================================== */
  /* START                                                              */
  /* ================================================================== */

  if (!mounted || s.phase === 'start') {
    if (confirmReset) {
      return frame(
        <>
          <Body $center>
            <Question>{t('startOverConfirm')}</Question>
            <Lede style={{ marginTop: '2.4rem' }}>{t('startOverWarn')}</Lede>
          </Body>
          <Foot>
            <Button $accent={A0} onClick={restart}>
              {t('startOver')}
            </Button>
            <TextButton onClick={() => setConfirmReset(false)}>{t('goBack')}</TextButton>
          </Foot>
        </>,
        { accent: A0, glow: 0.3 }
      );
    }
    return frame(
      <>
        <LangSwitch $accent={A0}>
          {LANGS.map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => set({ lang: l })}>
              {l}
            </button>
          ))}
        </LangSwitch>
        <Body $center>
          <Wordmark>CLOSER</Wordmark>
          <Lede>{t('tagline')}</Lede>
        </Body>
        <Foot>
          {mounted && resumable ? (
            <>
              <Small style={{ textAlign: 'center' }}>{t('welcomeBack')}</Small>
              <Button
                $accent={A0}
                onClick={() => {
                  const r = { ...resumable, lang };
                  setS(r);
                  setResumable(null);
                  if (r.phase === 'q') enterQuestion(r.qIndex, r);
                }}
              >
                {t('continueGame')}
              </Button>
              <TextButton onClick={() => setConfirmReset(true)}>{t('startOver')}</TextButton>
            </>
          ) : (
            <>
              <Button $accent={A0} onClick={() => set({ phase: 'players' })}>
                {t('start')}
              </Button>
              <Small style={{ textAlign: 'center' }}>{t('aboutMinutes')}</Small>
            </>
          )}
        </Foot>
        <CloserInstallHint lang={lang} accent={A0} />
      </>,
      { accent: A0, glow: 0.3 }
    );
  }

  /* ================================================================== */
  /* PLAYER SETUP                                                       */
  /* ================================================================== */

  if (s.phase === 'players') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('whosPlaying')}</Kicker>
          <Field $accent={A0}>
            <span>{t('yourName')}</span>
            <input
              value={s.players[0]}
              maxLength={18}
              autoComplete="off"
              onChange={(e) => set({ players: [e.target.value, s.players[1]] })}
            />
          </Field>
          <Field $accent={A0}>
            <span>{t('theirName')}</span>
            <input
              value={s.players[1]}
              maxLength={18}
              autoComplete="off"
              onChange={(e) => set({ players: [s.players[0], e.target.value] })}
            />
          </Field>
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() =>
              set({ phase: 'mode', starterOffset: Math.random() < 0.5 ? 0 : 1 })
            }
          >
            {t('continue')}
          </Button>
          <Small style={{ textAlign: 'center' }}>{t('namesOptional')}</Small>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
    );
  }

  /* ================================================================== */
  /* MODE                                                               */
  /* ================================================================== */

  if (s.phase === 'mode') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('pickMode')}</Kicker>
          {MODES.map((m) => (
            <Choice
              key={m.id}
              $on={s.modeId === m.id}
              $accent={A0}
              aria-pressed={s.modeId === m.id}
              onClick={() => set({ modeId: m.id })}
            >
              <strong>{pick(m.title, lang)}</strong>
              <em>{pick(m.meta, lang)}</em>
              <span>{pick(m.blurb, lang)}</span>
            </Choice>
          ))}
          <Toggle
            $on={s.timerEnabled}
            $accent={A0}
            aria-pressed={s.timerEnabled}
            onClick={() => set({ timerEnabled: !s.timerEnabled })}
          >
            {t('timer')}
            <b>{s.timerEnabled ? t('on') : t('off')}</b>
          </Toggle>
        </Body>
        <Foot>
          <Button $accent={A0} onClick={() => set({ phase: 'intro' })}>
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
    );
  }

  /* ================================================================== */
  /* INTRO                                                              */
  /* ================================================================== */

  if (s.phase === 'intro') {
    return frame(
      <>
        <Body $center>
          <Lede>{t('introLines')}</Lede>
          <Lede style={{ marginTop: '3.2rem' }}>{t('introSkips')}</Lede>
          <Tokens $accent={A0} style={{ marginTop: '1.6rem', fontSize: '2rem' }}>
            {Array.from({ length: SKIP_TOKENS }, (_, i) => (
              <b key={i}>♥</b>
            ))}
          </Tokens>
        </Body>
        <Foot>
          <Button $accent={A0} onClick={() => set({ phase: 'act', pending: 0, qIndex: 0 })}>
            {t('begin')}
          </Button>
          <Small style={{ textAlign: 'center' }}>{t('privacy')}</Small>
        </Foot>
      </>,
      { accent: A0, glow: 0.24 }
    );
  }

  /* ================================================================== */
  /* ACT INTRO / BREAK                                                  */
  /* ================================================================== */

  if (s.phase === 'act') {
    const idx = actIndexFor(s.pending);
    const act = ACTS[idx];
    const st = ACT_STYLE[idx];
    return frame(
      <>
        <Body $center>
          <ActNumeral>{pick(act.numeral, lang)}</ActNumeral>
          <ActTitle $accent={st.accent}>{pick(act.title, lang)}</ActTitle>
          <Lede>{pick(act.intro, lang)}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => {
              const index = s.pending;
              const next = { ...s, phase: 'q', qIndex: index, actStartedAt: Date.now() };
              buzz(16);
              setS(next);
              enterQuestion(index, next);
            }}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow + 0.1 }
    );
  }

  if (s.phase === 'break') {
    const done = ACTS[s.breakAct];
    const st = ACT_STYLE[s.breakAct];
    return frame(
      <>
        <Body $center>
          <ActNumeral>
            {pick(done.numeral, lang)} {t('complete')}
          </ActNumeral>
          <ActTitle $accent={st.accent} style={{ fontSize: '3.2rem', marginBottom: '3.2rem' }}>
            {pick(done.title, lang)}
          </ActTitle>
          <Lede>{pick(done.breakText, lang)}</Lede>
          {done.breakSub && (
            <Lede style={{ marginTop: '2rem' }}>{pick(done.breakSub, lang)}</Lede>
          )}
        </Body>
        <Foot>
          <Button $accent={st.accent} onClick={() => set({ phase: 'act', actStartedAt: null })}>
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow }
    );
  }

  /* ================================================================== */
  /* SECRET QUESTION                                                    */
  /* ================================================================== */

  if (s.phase.startsWith('secret')) {
    const st = ACT_STYLE[2];
    const p = s.phase;

    if (p === 'secretPass1' || p === 'secretPass2') {
      const who = p === 'secretPass1' ? 0 : 1;
      return frame(
        <>
          <Body $center>
            <Kicker $accent={st.accent}>
              {p === 'secretPass1' ? tf('passPhoneTo', nameOf(0)) : t('passPhone')}
            </Kicker>
            {p === 'secretPass2' && <Lede>{tf('passPhoneText', nameOf(1))}</Lede>}
          </Body>
          <Foot>
            <Button
              $accent={st.accent}
              onClick={() => set({ phase: p === 'secretPass1' ? 'secret1' : 'secret2' })}
            >
              {p === 'secretPass1' ? tf('iAm', nameOf(0)) : t('done')}
            </Button>
          </Foot>
        </>,
        { accent: st.accent, glow: st.glow }
      );
    }

    if (p === 'secret1' || p === 'secret2') {
      const me = p === 'secret1' ? 0 : 1;
      return frame(
        <>
          <Body $center>
            <Kicker $accent={st.accent}>{tf('forOnly', nameOf(me))}</Kicker>
            <Lede>{tf('secretTask', nameOf(1 - me))}</Lede>
          </Body>
          <Foot>
            <Button
              $accent={st.accent}
              onClick={() => {
                const ready = [...s.secretReady];
                ready[me] = true;
                set({ secretReady: ready, phase: me === 0 ? 'secretPass2' : 'secretPassBack' });
              }}
            >
              {t('iHaveOne')}
            </Button>
          </Foot>
        </>,
        { accent: st.accent, glow: st.glow }
      );
    }

    // secretPassBack
    return frame(
      <>
        <Body $center>
          <Kicker $accent={st.accent}>{t('passPhoneBack')}</Kicker>
          <Lede>{t('passPhoneBackText')}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => {
              const index = s.pending;
              const next = { ...s, phase: 'q', qIndex: index };
              setS(next);
              enterQuestion(index, next);
            }}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow }
    );
  }

  /* ================================================================== */
  /* LAST QUESTION STAGING                                              */
  /* ================================================================== */

  if (s.phase === 'lastIntro') {
    return frame(
      <>
        <Body $center>
          <Question>{t('oneLastQuestion')}</Question>
        </Body>
        <Foot>
          <GhostButton
            onClick={() => {
              const index = s.pending;
              const next = { ...s, phase: 'q', qIndex: index };
              setS(next);
              enterQuestion(index, next);
            }}
          >
            {t('reveal')}
          </GhostButton>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.03 }
    );
  }

  if (s.phase === 'all36') {
    return frame(
      <>
        <Body $center>
          <Question>{t('allThirtySix')}</Question>
          {revealSecond && (
            <Lede style={{ marginTop: '3.2rem' }}>{t('butYouEachHad')}</Lede>
          )}
        </Body>
        <Foot>
          {revealSecond && (
            <GhostButton onClick={() => set({ phase: 'checkPass1' })}>{t('continue')}</GhostButton>
          )}
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.03 }
    );
  }

  /* ================================================================== */
  /* SECRET QUESTION RESOLUTION                                         */
  /* ================================================================== */

  // The phone is lying between both of them again after "that's all 36" --
  // each private check needs its own handoff first, same as capturing the
  // secret questions did, or the check isn't actually private.
  if (s.phase === 'checkPass1' || s.phase === 'checkPass2') {
    const who = s.phase === 'checkPass1' ? 0 : 1;
    return frame(
      <>
        <Body $center>
          <Kicker $accent={ACT_STYLE[2].accent}>{tf('passPhoneTo', nameOf(who))}</Kicker>
        </Body>
        <Foot>
          <Button
            $accent={ACT_STYLE[2].accent}
            onClick={() => set({ phase: who === 0 ? 'check1' : 'check2' })}
          >
            {tf('iAm', nameOf(who))}
          </Button>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.03 }
    );
  }

  if (s.phase === 'checkPassBack') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={ACT_STYLE[2].accent}>{t('passPhoneBack')}</Kicker>
          <Lede>{t('passPhoneBackText')}</Lede>
        </Body>
        <Foot>
          <Button $accent={ACT_STYLE[2].accent} onClick={() => set({ phase: 'q37intro' })}>
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.03 }
    );
  }

  if (s.phase === 'check1' || s.phase === 'check2') {
    const me = s.phase === 'check1' ? 0 : 1;
    const answer = (value) => {
      const asked = [...s.secretAsked];
      asked[me] = value;
      set({ secretAsked: asked, phase: me === 0 ? 'checkPass2' : 'checkPassBack' });
    };
    return frame(
      <>
        <Body $center>
          <Kicker>{tf('forOnly', nameOf(me))}</Kicker>
          <Question>{tf('didTheyAsk', nameOf(1 - me))}</Question>
        </Body>
        <Foot>
          <Row>
            <GhostButton onClick={() => answer(true)}>{t('yes')}</GhostButton>
            <GhostButton onClick={() => answer(false)}>{t('no')}</GhostButton>
          </Row>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.03 }
    );
  }

  /* ================================================================== */
  /* QUESTION 37                                                        */
  /* ================================================================== */

  if (s.phase === 'q37intro' || s.phase === 'q37' || s.phase === 'q37a' || s.phase === 'q37b') {
    // Exactly one person's question went unasked -- that person asks it now.
    const { neither, bothAsked, pendingPlayer } = classifySecretAsked(s.secretAsked);

    if (s.phase === 'q37intro') {
      let kicker = t('q37OneMore');
      let text = t('q37Neither');
      if (bothAsked) {
        kicker = t('q37AlreadyAsked');
        text = t('q37StillWantOne');
      } else if (!neither) {
        kicker = t('q37OneRemains');
        text = t('q37OneText');
      }
      return frame(
        <>
          <Body $center>
            <Kicker>{kicker}</Kicker>
            <Question>{text}</Question>
          </Body>
          <Foot>
            {bothAsked ? (
              <Row>
                <GhostButton onClick={() => set({ phase: 'q37' })}>{t('yes')}</GhostButton>
                <GhostButton onClick={() => set({ phase: 'ending', completed: true })}>
                  {t('end')}
                </GhostButton>
              </Row>
            ) : (
              <GhostButton onClick={() => set({ phase: neither ? 'q37a' : 'q37' })}>
                {neither ? t('q37Button') : t('continue')}
              </GhostButton>
            )}
          </Foot>
        </>,
        { accent: ACT_STYLE[2].accent, glow: 0.03 }
      );
    }

    if (s.phase === 'q37a' || s.phase === 'q37b') {
      // Nobody's question got asked during the game, so there is no
      // "pending player" to anchor on -- continue the same strict
      // alternation the whole game has used, one step past question 36, so
      // the order is fixed rather than a coin flip made twice.
      const opener = starterFor(TOTAL_QUESTIONS, s.starterOffset);
      const asker = s.phase === 'q37a' ? opener : 1 - opener;
      return frame(
        <>
          <Body $center>
            <Kicker>{t('q37Label')}</Kicker>
            <Question>{tf('q37AskSecret', nameOf(asker))}</Question>
          </Body>
          <Foot>
            {s.phase === 'q37a' ? (
              <Button $accent={ACT_STYLE[2].accent} onClick={() => set({ phase: 'q37b' })}>
                {t('continue')}
              </Button>
            ) : (
              <TextButton onClick={() => set({ phase: 'ending', completed: true })}>
                {t('done')}
              </TextButton>
            )}
          </Foot>
        </>,
        { accent: ACT_STYLE[2].accent, glow: 0.03 }
      );
    }

    // 'one' and 'both' still land on a single shared prompt -- there is
    // exactly one question left to ask (or, for 'both', one optional bonus),
    // so there is nothing to sequence.
    let prompt = pick(Q37.both, lang);
    if (!neither && !bothAsked) prompt = Q37.one(lang, nameOf(pendingPlayer), nameOf(1 - pendingPlayer));

    return frame(
      <>
        <Body $center>
          <Kicker>{t('q37Label')}</Kicker>
          <Question>{prompt}</Question>
        </Body>
        <Foot>
          <TextButton onClick={() => set({ phase: 'ending', completed: true })}>
            {t('done')}
          </TextButton>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.03 }
    );
  }

  /* ================================================================== */
  /* ENDING                                                             */
  /* ================================================================== */

  if (s.phase === 'ending') {
    const isFinal = beat === ENDING_BEATS.length - 1;
    return frame(
      <>
        <Body $center onClick={() => !isFinal && setBeat((b) => b + 1)}>
          <Question key={beat}>{t(ENDING_BEATS[beat])}</Question>
        </Body>
        <Foot>
          {isFinal && (
            <>
              <Small style={{ textAlign: 'center', letterSpacing: '.3em' }}>CLOSER</Small>
              <TextButton onClick={restart}>{t('playAgain')}</TextButton>
            </>
          )}
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: isFinal ? 0.1 : 0.02 }
    );
  }

  /* ================================================================== */
  /* STAY                                                               */
  /* ================================================================== */

  if (staying) {
    return (
      <Screen $accent={style.accent} $glow={0.02}>
        <CloserGlobal />
        <Stay>
          <StayDot $accent={style.accent} />
          <Lede style={{ textAlign: 'center' }}>{t('stayTitle')}</Lede>
          {stayReady && (
            <TextButton
              onClick={() => {
                setStaying(false);
                leaveQuestion();
              }}
            >
              {t('continue')}
            </TextButton>
          )}
        </Stay>
      </Screen>
    );
  }

  /* ================================================================== */
  /* QUESTION                                                           */
  /* ================================================================== */

  const questionText = pick(question, lang);

  // Whose turn it is reads the same whether the question is still behind a
  // twist screen, mid-countdown, or already the live question -- computed
  // once and reused everywhere, so it never has to agree with itself.
  let badge = (
    <TurnBadge $accent={style.accent}>
      <TurnName $accent={style.accent}>{nameOf(starter)}</TurnName>
      <TurnVerb>{t('turnFirst')}</TurnVerb>
    </TurnBadge>
  );
  if (twist === 'both') {
    badge = (
      <TurnBadge $accent={style.accent}>
        <TurnName $accent={style.accent}>{t('turnBoth')}</TurnName>
        <TurnVerb>{t('turnBothVerb')}</TurnVerb>
      </TurnBadge>
    );
  } else if (twist === 'predict') {
    badge = (
      <TurnBadge $accent={style.accent}>
        <TurnName $accent={style.accent}>{nameOf(starter)}</TurnName>
        <TurnVerb>{t('turnAnswers')}</TurnVerb>
      </TurnBadge>
    );
  }

  let inner;

  if (step === 'twist' && twist === 'both') {
    // BOTH shows the real question right away -- there is nothing to guess
    // and nothing to hide, only a moment to read before answering together.
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{t('bothLabel')}</TwistLabel>
          {badge}
          <Question>{questionText}</Question>
          <Lede style={{ marginTop: '2.4rem' }}>{t('bothText')}</Lede>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={() => runCountdown(3)}>
            {t('ready')}
          </Button>
        </Foot>
      </>
    );
  } else if (step === 'twist') {
    // PREDICT and NO THINKING both still open on an explanation screen,
    // deliberately without the question -- PREDICT because the guess has to
    // come first, NO THINKING because the question is meant to land at the
    // same moment the count starts, not before.
    const copy = {
      predict: {
        label: t('predictLabel'),
        text: tf('predictText', nameOf(1 - starter), nameOf(starter)),
      },
      nothinking: { label: t('nothinkingLabel'), text: t('nothinkingText') },
    }[twist];
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{copy.label}</TwistLabel>
          <Question>{copy.text}</Question>
        </Body>
        <Foot>
          <Button
            $accent={style.accent}
            onClick={() => {
              if (twist === 'predict') setStep('ask');
              else runCountdown(5);
            }}
          >
            {t('ready')}
          </Button>
        </Foot>
      </>
    );
  } else if (step === 'counting') {
    // The question (and, for NO THINKING, the starter) appears together
    // with the count and stays put through to zero -- nobody answers
    // something they have not seen.
    inner = (
      <Body $center>
        <TwistLabel $accent={style.accent}>
          {twist === 'both' ? t('bothLabel') : t('nothinkingLabel')}
        </TwistLabel>
        {badge}
        <Question>{questionText}</Question>
        {/* role="timer" describes what this is to assistive tech without
            making it a live region -- see the `announce` state above for
            the two announcements that actually get spoken. */}
        <Counter
          $accent={style.accent}
          style={{ marginTop: '3.2rem' }}
          role="timer"
          aria-atomic="true"
        >
          {count}
        </Counter>
      </Body>
    );
  } else if (step === 'deeper') {
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{t('deeperLabel')}</TwistLabel>
          <Question>{t('deeperText')}</Question>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={() => setStep('deeperOpen')}>
            {t('deeperAsk')}
          </Button>
          <TextButton onClick={() => goTo(s.qIndex + 1)}>{t('next')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'deeperOpen') {
    inner = (
      <>
        <Body $center>
          <Lede>{t('deeperOpen')}</Lede>
        </Body>
        <Foot>
          <GhostButton onClick={() => goTo(s.qIndex + 1)}>{t('continue')}</GhostButton>
        </Foot>
      </>
    );
  } else {
    inner = (
      <>
        <Body $center>
          {!isLast && badge}
          <Question>{questionText}</Question>
          {isLast && <Lede style={{ marginTop: '3.2rem' }}>{t('takeYourTime')}</Lede>}
        </Body>
        <Foot>
          {canStay ? (
            <Row>
              <GhostButton onClick={() => setStaying(true)}>{t('stay')}</GhostButton>
              <Button $accent={style.accent} onClick={leaveQuestion}>
                {t('next')}
              </Button>
            </Row>
          ) : (
            <Button $accent={style.accent} onClick={leaveQuestion}>
              {isLast ? t('done') : t('next')}
            </Button>
          )}
          {/* At zero the control simply goes away -- no "no skips left". */}
          {!isLast && s.skipsRemaining > 0 && (
            <TextButton onClick={() => setSkipAsking(true)}>{t('skip')}</TextButton>
          )}
        </Foot>
      </>
    );
  }

  const progress = style.progress;
  const showChrome = !isLast && step !== 'counting';

  return frame(
    <>
      {showChrome && (
        <>
          <TopBar $chrome={style.chrome}>
            <Count>
              {progress === 'number'
                ? String(s.qIndex + 1).padStart(2, '0')
                : `${String(s.qIndex + 1).padStart(2, '0')} / ${TOTAL_QUESTIONS}`}
            </Count>
            {s.timerEnabled && s.actStartedAt ? (
              <Elapsed $long={overtime}>{overtime ? t('timerOver') : clockOf(elapsed)}</Elapsed>
            ) : null}
            <Tokens $accent={style.accent} aria-label={`${s.skipsRemaining}/${SKIP_TOKENS}`}>
              {Array.from({ length: SKIP_TOKENS }, (_, i) =>
                i < s.skipsRemaining ? <b key={i}>♥</b> : <s key={i}>♡</s>
              )}
            </Tokens>
          </TopBar>
          {progress === 'full' && (
            <Bar $chrome={style.chrome}>
              <Track $pct={pct} $accent={style.accent} />
            </Bar>
          )}
        </>
      )}

      {inner}

      {/* One polite announcement at the start of a countdown and one at
          zero -- never per tick. This element stays mounted across every
          step of a question (twist/counting/ask/deeper) so its content
          changes are picked up as live-region updates rather than a fresh
          element appearing. */}
      <VisuallyHidden role="status" aria-live="polite">
        {announce}
      </VisuallyHidden>

      {skipAsking && (
        <Sheet onClick={() => setSkipAsking(false)}>
          <SheetPanel onClick={(e) => e.stopPropagation()}>
            <h2>{t('skipConfirmTitle')}</h2>
            <Small>{t('skipConfirmSub')}</Small>
            <Tokens
              $accent={style.accent}
              style={{ margin: '2.4rem 0', fontSize: '2.2rem' }}
            >
              {Array.from({ length: SKIP_TOKENS }, (_, i) =>
                i < s.skipsRemaining - 1 ? <b key={i}>♥</b> : <s key={i}>♡</s>
              )}
            </Tokens>
            <Small style={{ marginBottom: '2.4rem' }}>{t('skipUses')}</Small>
            <Button
              $accent={style.accent}
              onClick={() => {
                buzz(14);
                const left = s.skipsRemaining - 1;
                setSkipAsking(false);
                set({ skipsRemaining: left });
                setJustSkipped(left);
              }}
            >
              {t('skip')}
            </Button>
            <TextButton style={{ width: '100%' }} onClick={() => setSkipAsking(false)}>
              {t('goBack')}
            </TextButton>
          </SheetPanel>
        </Sheet>
      )}

      {justSkipped !== null && (
        <Flash>
          <Question style={{ textAlign: 'center' }}>{t('skipped')}</Question>
          <Tokens $accent={style.accent} style={{ fontSize: '2.4rem' }}>
            {Array.from({ length: SKIP_TOKENS }, (_, i) =>
              i < justSkipped ? <b key={i}>♥</b> : <s key={i}>♡</s>
            )}
          </Tokens>
          {justSkipped > 0 && <Small>{tf('skipsLeft', justSkipped)}</Small>}
        </Flash>
      )}
    </>
  );
}
