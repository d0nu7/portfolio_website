import React from 'react';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';
import { tr } from '../../i18n/LanguageContext';
import useHomeCopy from '../../i18n/useHomeCopy';
import { CardBody, CardInfo, CardLink, GridContainer, HeaderThree, Img, ImgFrame, Tag, TagList } from './ProjectsStyles';

const Projects = () => {
  const { lang, t } = useHomeCopy();
  return (
  <Section id="projects">
    <SectionDivider divider />
    <SectionTitle>{t.projects.title}</SectionTitle>
    <GridContainer>
      {projects.map((p) => (
        <li key={p.id}>
          <CardLink href={p.source} target="_blank" rel="noopener noreferrer">
            <ImgFrame>
              <Img src={p.image} alt={t.projects.imageAlt(p.title)} width="400" height="225" loading="lazy" decoding="async" />
            </ImgFrame>
            <CardBody>
              <HeaderThree>{p.title}</HeaderThree>
              <CardInfo>{tr(p.description, lang)}</CardInfo>
              <TagList aria-label={t.projects.tags}>
                {p.tags.map((tag) => <Tag key={tr(tag, 'en')}>{tr(tag, lang)}</Tag>)}
              </TagList>
            </CardBody>
          </CardLink>
        </li>
      ))}
    </GridContainer>
  </Section>
  );
};

export default Projects;
