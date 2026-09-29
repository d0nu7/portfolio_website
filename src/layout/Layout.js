import React from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import useConsoleHello from '../hooks/useConsoleHello'
import useReveal from '../hooks/useReveal'
import { Container } from './LayoutStyles'

// Menu, footer and language switch read the language from LanguageContext.
export const Layout = ({children}) => {
  useReveal()
  useConsoleHello()

  return (
    <Container>
     <Header/>
     <main>{children}</main> 
     <Footer/>
    </Container>
  )
}
