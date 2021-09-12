import Acomplishments from '../components/Acomplishments/Acomplishments';
import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Teaching from '../components/Teaching/Teaching';
import Research from '../components/Research/Research';
import Skills from '../components/Skills/Skills';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
import Head from 'next/head'

const Home = () => {
  return (
    <Layout>
      <Section grid>
        <Hero />
        <BgAnimation />
      </Section>
      
      <Timeline />
      <Skills />
      <Teaching />
      <Acomplishments />
      <Projects />
      <Research />
    </Layout>
  );
};

export default Home;
