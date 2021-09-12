import React from 'react';
import {GiSmartphone, GiVrHeadset, GiGamepad ,GiLevelThree, GiWireframeGlobe} from 'react-icons/gi';
import {BiVideoRecording } from 'react-icons/bi';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './SkillsStyles';

const Skills = () =>  (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Skills</SectionTitle>
    <SectionText>
      I've worked with a range a technologies.
      From Game Development to Data Analysis. 
    </SectionText>
    <List>

      <ListItem>
        <picture>
          <GiVrHeadset size="4rem" />
        </picture>
        <ListContainer>
          <ListTitle>Mixed Reality</ListTitle>
          <ListParagraph>
            AR and VR...
          </ListParagraph>
        </ListContainer>
      </ListItem>

      <ListItem>
        <picture>
          <GiGamepad size="4rem" />
        </picture>
        <ListContainer>
          <ListTitle>Game</ListTitle>
          <ListParagraph>
            Unity...
          </ListParagraph>
        </ListContainer>
      </ListItem>

      <ListItem>
        <picture>
          <GiWireframeGlobe size="4rem" />
        </picture>
        <ListContainer>
          <ListTitle>Web</ListTitle>
          <ListParagraph>
            Front / Back
          </ListParagraph>
        </ListContainer>
      </ListItem>

      <ListItem>
        <picture>
          <GiLevelThree size="4rem" />
        </picture>
        <ListContainer>
          <ListTitle>Prototyping</ListTitle>
          <ListParagraph>
            Arduino
            3D-Print
          </ListParagraph>
        </ListContainer>
      </ListItem>

      <ListItem>
        <picture>
          <GiSmartphone size="4rem" />
        </picture>
        <ListContainer>
          <ListTitle>Mobile</ListTitle>
          <ListParagraph>
            Arduino
            3D-Print
          </ListParagraph>
        </ListContainer>
      </ListItem>

      
      <ListItem>
        <picture>
          <BiVideoRecording size="4rem" />
        </picture>
        <ListContainer>
          <ListTitle>AV</ListTitle>
          <ListParagraph>
            Audio and Video Production
          </ListParagraph>
        </ListContainer>
      </ListItem>

    </List>
  </Section>
);

export default Skills;
