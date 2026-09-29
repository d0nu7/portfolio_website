import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

/*
 * CLOSER used to live here and now has its own home at closer.radi.solutions
 * (repo: github.com/d0nu7/Closer). This page stays so old links, bookmarks
 * and installed home-screen apps land on a clear pointer instead of a 404.
 * Deliberately a page rather than a silent redirect: people with the old
 * app installed need to be told to reinstall it.
 */
const NEW_URL = 'https://closer.radi.solutions/';

const Screen = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: max(32px, env(safe-area-inset-top)) 24px max(32px, env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 50% 0%, rgba(19, 173, 199, .16), transparent 55%),
    #08090c;
  color: rgb(242, 243, 245);
`;

const Inner = styled.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
`;

const Logo = styled.p`
  font-size: 56px;
  font-weight: 700;
  letter-spacing: .02em;
  line-height: 1;
`;

const Title = styled.h1`
  margin-top: 28px;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.25;
`;

const Text = styled.p`
  margin-top: 14px;
  color: rgba(242, 243, 245, .72);
  font-size: 17px;
  line-height: 1.55;
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  margin-top: 32px;
  border-radius: 999px;
  background: #13adc7;
  color: #04181c;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  transition: transform .2s ease, background-color .2s ease;

  &:hover { background: #3fc3d8; transform: translateY(-1px); }
  &:focus-visible { outline: 3px solid rgba(19, 173, 199, .6); outline-offset: 3px; }
`;

const Url = styled.p`
  margin-top: 12px;
  color: rgba(242, 243, 245, .55);
  font-size: 14px;
  text-align: center;
`;

const Note = styled.p`
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid rgba(242, 243, 245, .12);
  color: rgba(242, 243, 245, .6);
  font-size: 14px;
  line-height: 1.55;
`;

const English = styled.p`
  margin-top: 20px;
  color: rgba(242, 243, 245, .5);
  font-size: 13px;
  line-height: 1.55;
`;

const Closer = () => (
  <>
    <Head>
      <title key="title">CLOSER ist umgezogen</title>
      <meta key="description" name="description" content="CLOSER hat eine neue Adresse: closer.radi.solutions" />
      <meta key="robots" name="robots" content="noindex, follow" />
      <meta key="theme-color" name="theme-color" content="#08090c" />
      <link key="canonical" rel="canonical" href={NEW_URL} />
    </Head>
    <Screen>
      <Inner>
        <Logo>CLOSER</Logo>
        <Title>CLOSER ist umgezogen.</Title>
        <Text>Gleiches Spiel, neue Adresse. Zwei Menschen, ein Handy, kein Small Talk.</Text>
        <Button href={NEW_URL}>Zu CLOSER</Button>
        <Url>closer.radi.solutions</Url>
        <Note>
          Hast du CLOSER am Homescreen installiert? Dann lösche die alte App und
          installiere CLOSER auf der neuen Adresse neu. Ein laufendes Spiel wird
          dabei leider nicht mitgenommen.
        </Note>
        <English lang="en">
          CLOSER has moved to closer.radi.solutions. If you installed it on your
          home screen, remove the old app and add it again from the new address.
        </English>
      </Inner>
    </Screen>
  </>
);

export default Closer;
