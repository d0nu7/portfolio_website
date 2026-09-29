import React from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import useConsoleHello from '../hooks/useConsoleHello'
import useReveal from '../hooks/useReveal'
import useHomeCopy from '../i18n/useHomeCopy'
import { Container, SkipLink } from './LayoutStyles'

// Menu, footer and language switch read the language from LanguageContext.
export const Layout = ({ children }) => {
  useReveal()
  useConsoleHello()
  const { t } = useHomeCopy()

  return (
    <Container>
      <SkipLink href="#main">{t.nav.skip}</SkipLink>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </Container>
  )
}
