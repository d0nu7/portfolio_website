import React from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import useConsoleHello from '../hooks/useConsoleHello'
import useReveal from '../hooks/useReveal'
import { Container } from './LayoutStyles'

// `lang` localises the shared chrome (menu, footer). The homepage is English;
// /ki-schulungen passes its current DE/EN choice.
export const Layout = ({children, lang = 'en'}) => {
  useReveal()
  useConsoleHello()

  return (
    <Container>
     <Header lang={lang}/>
     <main>{children}</main> 
     <Footer lang={lang}/>
    </Container>
  )
}
