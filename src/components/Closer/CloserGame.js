import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  ACTS,
  ACT_STYLE,
  LANGS,
  MODES,
  QUESTION_37,
  SECRET_AT_INDEX,
  SKIP_TOKENS,
  TOTAL_QUESTIONS,
  actIndexFor,
  pick,
  questionAt,
} from '../../constants/closer';
import COPY from '../../constants/closerCopy';
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
  CounterQuestion,
  Elapsed,
  Field,
  Foot,
  GhostButton,
  Hairline,
  Kicker,
  LangSwitch,
  Lede,
  Question,
  Row,
  Screen,
  Small,
  Stay,
  StayDot,
  TextButton,
  Toggle,
  Tokens,
  TopBar,
  Track,
  Turn,
  Twist,
  Wordmark,
} from './CloserStyles';

const STORAGE_KEY = 'closer:v1';
const ACT_MINUTES = 15;

/*
 * Nothing about a conversation is stored -- answers are never typed in. What
 * persists is only enough to survive a closed tab: names, mode, language,
 * which question is up, tokens left, whether the secret question has happened.
 */
const initialState = {
  phase: 'intro',
  lang: 'de',
  players: ['', ''],
  modeId: MODES[0].id,
  timerOn: false,
  qIndex: 0,
  pending: 0,
  breakAct: 0,
  tokens: SKIP_TOKENS,
  secretTaken: false,
  secretAsked: null,
  starterOffset: 0,
  q37Pick: 0,
  actStartedAt: null,
};

function loadSaved() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || !saved.phase) return null;
    if (saved.phase === 'intro' || saved.phase === 'end') return null;
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
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function CloserGame() {
  const [mounted, setMounted] = useState(false);
  const [resumable, setResumable] = useState(null);
  const [s, setS] = useState(initialState);

  // Sub-step within a question: twist intro -> countdown -> the question itself.
  const [step, setStep] = useState('ask');
  const [count, setCount] = useState(0);
  const [deeperUsed, setDeeperUsed] = useState(false);
  const [quickLeft, setQuickLeft] = useState(0);
  const [staying, setStaying] = useState(false);
  const [stayReady, setStayReady] = useState(false);
  const [now, setNow] = useState(0);

  const set = useCallback((patch) => setS((prev) => ({ ...prev, ...patch })), []);

  const lang = s.lang;
  // t() for plain entries, t.fn() for the few lines that take a name.
  const t = useCallback((key) => pick(COPY[key], lang), [lang]);
  const tf = useCallback((key, ...args) => COPY[key](lang, ...args), [lang]);

  // Render the server markup first, then look for a saved game. Keeps the
  // static export and the first client render identical.
  useEffect(() => {
    setMounted(true);
    setResumable(loadSaved());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (s.phase === 'intro') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch (err) {
      /* private mode, quota, whatever -- the game still works */
    }
  }, [s, mounted]);

  // One ticking clock, only while an act timer is actually on screen.
  useEffect(() => {
    if (!s.timerOn || !s.actStartedAt) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    setNow(Date.now());
    return () => clearInterval(id);
  }, [s.timerOn, s.actStartedAt]);

  const mode = useMemo(
    () => MODES.find((m) => m.id === s.modeId) || MODES[0],
    [s.modeId]
  );
  const actIdx = actIndexFor(s.qIndex);
  const style = ACT_STYLE[actIdx];
  const question = questionAt(s.qIndex);
  const isLast = s.qIndex === TOTAL_QUESTIONS - 1;

  const nameOf = useCallback(
    (i) => {
      const given = (s.players[i] || '').trim();
      if (given) return given;
      if (lang === 'de') return i === 0 ? 'Spieler eins' : 'Spieler zwei';
      return i === 0 ? 'Player one' : 'Player two';
    },
    [s.players, lang]
  );
  const starter = (s.qIndex + s.starterOffset) % 2;

  // Which twist this question carries, if the mode lets it through.
  const twist = useMemo(() => {
    if (!question) return null;
    if (question.both && mode.twists.both) return 'both';
    if (question.quick && mode.twists.quick) return 'quick';
    if (question.predict && mode.twists.predict) return 'predict';
    return null;
  }, [question, mode]);

  const enterQuestion = useCallback((index, state) => {
    const q = questionAt(index);
    const m = MODES.find((x) => x.id === state.modeId) || MODES[0];
    let first = 'ask';
    if (q) {
      if (q.both && m.twists.both) first = 'both';
      else if (q.quick && m.twists.quick) first = 'quick';
      else if (q.predict && m.twists.predict) first = 'predict';
    }
    setStep(first);
    setDeeperUsed(false);
    setQuickLeft(0);
    setStaying(false);
    setStayReady(false);
  }, []);

  // Every route between questions runs through here: act breaks, the secret
  // question and the staged finale all interrupt on their way past.
  const goTo = useCallback(
    (index, patch = {}) => {
      const base = { ...s, ...patch };
      if (index >= TOTAL_QUESTIONS) {
        set({ ...patch, phase: 'after' });
        return;
      }
      if (index > 0 && index % 12 === 0) {
        buzz([18, 60, 18]);
        set({ ...patch, phase: 'break', breakAct: index / 12 - 1, pending: index });
        return;
      }
      if (index === SECRET_AT_INDEX && !base.secretTaken) {
        set({ ...patch, phase: 'secret1', pending: index });
        return;
      }
      if (index === TOTAL_QUESTIONS - 1) {
        set({ ...patch, phase: 'finale', pending: index });
        return;
      }
      set({ ...patch, phase: 'q', qIndex: index });
      enterQuestion(index, base);
    },
    [s, set, enterQuestion]
  );

  // Leaving a question: GO DEEPER first, then STAY, then the next question.
  const leaveQuestion = useCallback(() => {
    if (question?.deeper && mode.twists.deeper && !deeperUsed) {
      setStep('deeper');
      return;
    }
    goTo(s.qIndex + 1);
  }, [question, mode, deeperUsed, goTo, s.qIndex]);

  const skip = useCallback(() => {
    if (s.tokens <= 0) return;
    buzz(12);
    goTo(s.qIndex + 1, { tokens: s.tokens - 1 });
  }, [s.tokens, s.qIndex, goTo]);

  // BOTH: the 3-2-1 before answering at the same time.
  const countdownRef = useRef(null);
  const runCountdown = useCallback((from, done) => {
    setCount(from);
    setStep('count');
    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current);
          buzz(20);
          done();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, []);
  useEffect(() => () => clearInterval(countdownRef.current), []);

  // NO THINKING counts down while the question is already on screen, so the
  // answer has to come out before it can be composed.
  useEffect(() => {
    if (quickLeft <= 0) return undefined;
    const id = setTimeout(() => {
      setQuickLeft((n) => {
        if (n === 1) buzz(20);
        return n - 1;
      });
    }, 1000);
    return () => clearTimeout(id);
  }, [quickLeft]);

  // STAY hides the game. The CONTINUE button only appears once the two of them
  // have had a moment -- there is deliberately no timer telling them to hurry.
  useEffect(() => {
    if (!staying) return undefined;
    setStayReady(false);
    const id = setTimeout(() => setStayReady(true), 6000);
    return () => clearTimeout(id);
  }, [staying]);

  const restart = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
    setResumable(null);
    setS((prev) => ({ ...initialState, lang: prev.lang }));
    setStep('ask');
  }, []);

  const pct = Math.round((s.qIndex / (TOTAL_QUESTIONS - 1)) * 100);
  const elapsed = s.actStartedAt && now ? now - s.actStartedAt : 0;
  const overtime = elapsed > ACT_MINUTES * 60 * 1000;

  const frame = (content, opts = {}) => (
    <Screen $accent={opts.accent || style.accent} $glow={opts.glow ?? style.glow}>
      <CloserGlobal />
      {content}
    </Screen>
  );

  /* ------------------------------------------------------------------ */
  /* intro                                                              */
  /* ------------------------------------------------------------------ */

  if (!mounted || s.phase === 'intro') {
    return frame(
      <>
        <LangSwitch $accent={ACT_STYLE[0].accent}>
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => set({ lang: l })}
            >
              {l}
            </button>
          ))}
        </LangSwitch>
        <Body $center>
          <Wordmark>CLOSER</Wordmark>
          <Lede>{t('tagline')}</Lede>
          <Lede>{t('introBlurb')}</Lede>
        </Body>
        <Foot>
          {mounted && resumable ? (
            <>
              <Button
                $accent={ACT_STYLE[0].accent}
                onClick={() => {
                  const r = { ...resumable, lang };
                  setS(r);
                  setResumable(null);
                  if (r.phase === 'q') enterQuestion(r.qIndex, r);
                }}
              >
                {t('continue')}
              </Button>
              <TextButton onClick={restart}>{t('startOver')}</TextButton>
            </>
          ) : (
            <Button
              $accent={ACT_STYLE[0].accent}
              onClick={() => set({ phase: 'names' })}
            >
              {t('begin')}
            </Button>
          )}
          <Small>{t('introFoot')}</Small>
        </Foot>
      </>,
      { accent: ACT_STYLE[0].accent, glow: 0.3 }
    );
  }

  /* ------------------------------------------------------------------ */
  /* names                                                              */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'names') {
    const ready = s.players[0].trim() && s.players[1].trim();
    return frame(
      <>
        <Body $center>
          <Kicker $accent={ACT_STYLE[0].accent}>{t('whoIsPlaying')}</Kicker>
          <Field $accent={ACT_STYLE[0].accent}>
            <span>{t('firstName')}</span>
            <input
              value={s.players[0]}
              maxLength={18}
              autoComplete="off"
              placeholder="Radi"
              onChange={(e) => set({ players: [e.target.value, s.players[1]] })}
            />
          </Field>
          <Field $accent={ACT_STYLE[0].accent}>
            <span>{t('secondName')}</span>
            <input
              value={s.players[1]}
              maxLength={18}
              autoComplete="off"
              placeholder={t('namePlaceholder')}
              onChange={(e) => set({ players: [s.players[0], e.target.value] })}
            />
          </Field>
        </Body>
        <Foot>
          <Button
            $accent={ACT_STYLE[0].accent}
            disabled={!ready}
            onClick={() =>
              set({
                phase: 'mode',
                starterOffset: Math.random() < 0.5 ? 0 : 1,
                q37Pick: Math.floor(Math.random() * QUESTION_37.withoutSecret.length),
              })
            }
          >
            {t('continue')}
          </Button>
          <Small>{t('namesNote')}</Small>
        </Foot>
      </>,
      { accent: ACT_STYLE[0].accent, glow: 0.28 }
    );
  }

  /* ------------------------------------------------------------------ */
  /* mode                                                               */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'mode') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={ACT_STYLE[0].accent}>{t('pickMode')}</Kicker>
          {MODES.map((m) => (
            <Choice
              key={m.id}
              $on={s.modeId === m.id}
              $accent={ACT_STYLE[0].accent}
              onClick={() => set({ modeId: m.id })}
            >
              <strong>{pick(m.title, lang)}</strong>
              <em>{pick(m.meta, lang)}</em>
              <span>{pick(m.blurb, lang)}</span>
            </Choice>
          ))}
          <Toggle
            $on={s.timerOn}
            $accent={ACT_STYLE[0].accent}
            onClick={() => set({ timerOn: !s.timerOn })}
          >
            {t('clockLabel')}
            <b>{s.timerOn ? t('on') : t('off')}</b>
          </Toggle>
        </Body>
        <Foot>
          <Button
            $accent={ACT_STYLE[0].accent}
            onClick={() => set({ phase: 'act', pending: 0, qIndex: 0 })}
          >
            {t('startActOne')}
          </Button>
          <Small>{t('modeNote')}</Small>
        </Foot>
      </>,
      { accent: ACT_STYLE[0].accent, glow: 0.28 }
    );
  }

  /* ------------------------------------------------------------------ */
  /* act intro                                                          */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'act') {
    const idx = actIndexFor(s.pending);
    const act = ACTS[idx];
    const st = ACT_STYLE[idx];
    return frame(
      <>
        <Body $center>
          <ActNumeral>{pick(act.numeral, lang)}</ActNumeral>
          <ActTitle $accent={st.accent}>{pick(act.title, lang)}</ActTitle>
          <Lede>{pick(act.subtitle, lang)}</Lede>
          <Lede>{pick(act.note, lang)}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => {
              const index = s.pending;
              const next = { ...s, phase: 'q', qIndex: index, actStartedAt: Date.now() };
              setS(next);
              enterQuestion(index, next);
            }}
          >
            {t('begin')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow + 0.1 }
    );
  }

  /* ------------------------------------------------------------------ */
  /* act break                                                          */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'break') {
    const done = ACTS[s.breakAct];
    const st = ACT_STYLE[s.breakAct];
    return frame(
      <>
        <Body $center>
          <ActNumeral>
            {pick(done.numeral, lang)} {t('complete')}
          </ActNumeral>
          <Question>{t('breakHeadline')}</Question>
          <Lede style={{ marginTop: '2.8rem' }}>{t('breakSip')}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => set({ phase: 'act', actStartedAt: null })}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow }
    );
  }

  /* ------------------------------------------------------------------ */
  /* secret question                                                    */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'secret1' || s.phase === 'secret2') {
    const first = s.phase === 'secret1';
    const who = first ? nameOf(0) : nameOf(1);
    const other = first ? nameOf(1) : nameOf(0);
    const st = ACT_STYLE[1];
    return frame(
      <>
        <Body $center>
          <Kicker $accent={st.accent}>{tf('forOnly', who)}</Kicker>
          <Question>{tf('secretHeadline', other)}</Question>
          <Lede style={{ marginTop: '2.8rem' }}>{t('secretNote')}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => {
              if (first) {
                set({ phase: 'secret2' });
              } else {
                const index = s.pending;
                const next = { ...s, phase: 'q', qIndex: index, secretTaken: true };
                setS(next);
                enterQuestion(index, next);
              }
            }}
          >
            {t('secretCta')}
          </Button>
          <Small>{first ? tf('handPhoneTo', other) : t('putPhoneDown')}</Small>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow }
    );
  }

  /* ------------------------------------------------------------------ */
  /* finale staging                                                     */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'finale') {
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
            {t('ready')}
          </GhostButton>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.04 }
    );
  }

  /* ------------------------------------------------------------------ */
  /* after the 36th                                                     */
  /* ------------------------------------------------------------------ */

  if (s.phase === 'after') {
    return frame(
      <>
        <Body $center>
          <Question>{t('thatsIt')}</Question>
          <Lede style={{ marginTop: '2.8rem' }}>{t('putAway')}</Lede>
        </Body>
        <Foot>
          <TextButton
            onClick={() => set({ phase: s.secretTaken ? 'secretcheck' : 'q37' })}
          >
            {t('unlessOneMore')}
          </TextButton>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.04 }
    );
  }

  if (s.phase === 'secretcheck') {
    return frame(
      <>
        <Body $center>
          <Kicker>{t('secretCheckKicker')}</Kicker>
          <Question>{t('didTheyAsk')}</Question>
          {s.secretAsked === false && (
            <Lede style={{ marginTop: '2.8rem' }}>{t('maybeYouShould')}</Lede>
          )}
        </Body>
        <Foot>
          {s.secretAsked === null ? (
            <Row>
              <GhostButton onClick={() => set({ phase: 'q37', secretAsked: true })}>
                {t('yes')}
              </GhostButton>
              <GhostButton onClick={() => set({ secretAsked: false })}>
                {t('no')}
              </GhostButton>
            </Row>
          ) : (
            <GhostButton onClick={() => set({ phase: 'q37' })}>
              {t('continue')}
            </GhostButton>
          )}
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.04 }
    );
  }

  if (s.phase === 'q37') {
    const source = s.secretTaken
      ? QUESTION_37.withSecret
      : QUESTION_37.withoutSecret[s.q37Pick] || QUESTION_37.withoutSecret[0];
    return frame(
      <>
        <Body $center>
          <Kicker>{t('question37')}</Kicker>
          <Question>{pick(source, lang)}</Question>
        </Body>
        <Foot>
          <TextButton onClick={() => set({ phase: 'end' })}>{t('done')}</TextButton>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.04 }
    );
  }

  if (s.phase === 'end') {
    return frame(
      <>
        <Body $center>
          <Wordmark>CLOSER</Wordmark>
          <Lede>{t('endTagline')}</Lede>
        </Body>
        <Foot>
          <TextButton onClick={restart}>{t('playAgain')}</TextButton>
        </Foot>
      </>,
      { accent: ACT_STYLE[2].accent, glow: 0.08 }
    );
  }

  /* ------------------------------------------------------------------ */
  /* the question screen                                                */
  /* ------------------------------------------------------------------ */

  if (staying) {
    return (
      <Screen $accent={style.accent} $glow={0.03}>
        <CloserGlobal />
        <Stay>
          <StayDot $accent={style.accent} />
          <Lede style={{ textAlign: 'center' }}>{t('forgetTheGame')}</Lede>
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

  const twistCopy = {
    predict: {
      label: t('predictLabel'),
      text: tf('predictText', nameOf(1 - starter), nameOf(starter)),
      cta: t('ready'),
    },
    both: { label: t('bothLabel'), text: t('bothText'), cta: t('bothCta') },
    quick: { label: t('quickLabel'), text: t('quickText'), cta: t('quickCta') },
  };

  let inner;

  if (step === 'count') {
    inner = (
      <Body $center>
        <Counter $accent={style.accent}>{count}</Counter>
        <CounterQuestion>{pick(question, lang)}</CounterQuestion>
      </Body>
    );
  } else if (step === 'predict' || step === 'both' || step === 'quick') {
    const c = twistCopy[step];
    inner = (
      <>
        <Body $center>
          <Twist $accent={style.accent}>
            <strong>{c.label}</strong>
            <span>{c.text}</span>
          </Twist>
          <Question>{pick(question, lang)}</Question>
        </Body>
        <Foot>
          <Button
            $accent={style.accent}
            onClick={() => {
              if (step === 'predict') setStep('ask');
              else if (step === 'quick') {
                // The count belongs on the question, not in front of it.
                setStep('ask');
                setQuickLeft(8);
              } else runCountdown(3, () => setStep('ask'));
            }}
          >
            {c.cta}
          </Button>
        </Foot>
      </>
    );
  } else if (step === 'deeper') {
    inner = (
      <>
        <Body $center>
          <Kicker $accent={style.accent}>{t('deeperLabel')}</Kicker>
          <Question>{t('deeperHeadline')}</Question>
          <Lede style={{ marginTop: '2.8rem' }}>{t('deeperText')}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={style.accent}
            onClick={() => {
              setDeeperUsed(true);
              setStep('ask');
            }}
          >
            {t('deeperCta')}
          </Button>
          <TextButton onClick={() => goTo(s.qIndex + 1)}>{t('next')}</TextButton>
        </Foot>
      </>
    );
  } else {
    const canStay = question.stay && mode.twists.stay;
    let turnLine = <Turn>{tf('goesFirst', nameOf(starter))}</Turn>;
    if (twist === 'both') {
      turnLine = <Turn>{t('answerTogether')}</Turn>;
    } else if (twist === 'quick') {
      turnLine =
        quickLeft > 0 ? (
          <Turn $accent={style.accent}>
            {tf('dontOverthink', nameOf(starter))} <em>{quickLeft}</em>
          </Turn>
        ) : (
          <Turn>{t('takeYourTime')}</Turn>
        );
    }
    inner = (
      <>
        <Body $center>
          {!isLast && turnLine}
          <Question>{pick(question, lang)}</Question>
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
              {isLast ? t('weAnswered') : t('next')}
            </Button>
          )}
          {!isLast && (
            <TextButton onClick={skip} disabled={s.tokens <= 0}>
              {s.tokens > 0 ? t('skip') : t('noSkips')}
            </TextButton>
          )}
        </Foot>
      </>
    );
  }

  return frame(
    <>
      {!isLast && (
        <TopBar $chrome={style.chrome}>
          <Count>
            {style.showCount
              ? `${String(s.qIndex + 1).padStart(2, '0')} / ${TOTAL_QUESTIONS}`
              : pick(ACTS[actIdx].numeral, lang)}
          </Count>
          {s.timerOn && s.actStartedAt ? (
            <Elapsed>{overtime ? t('overTime') : clockOf(elapsed)}</Elapsed>
          ) : null}
          <Tokens $accent={style.accent}>
            {Array.from({ length: SKIP_TOKENS }, (_, i) =>
              i < s.tokens ? (
                <React.Fragment key={i}>♥</React.Fragment>
              ) : (
                <span key={i}>♥</span>
              )
            )}
          </Tokens>
        </TopBar>
      )}

      {!isLast && style.showBar && (
        <Bar $chrome={style.chrome}>
          {t('strangers')}
          <Track $pct={pct} $accent={style.accent} />
          {t('close')}
        </Bar>
      )}
      {!isLast && !style.showBar && <Hairline $pct={pct} />}

      {inner}
    </>
  );
}
