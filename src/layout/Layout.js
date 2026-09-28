import React from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import useReveal from '../hooks/useReveal'
import { Container } from './LayoutStyles'

export const Layout = ({children}) => {
  useReveal()

  return (
    <Container>
     <Header/>
     <main>{children}</main> 
     <Footer/>
    </Container>
  )
}
