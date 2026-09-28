import React from "react";
import {
  GiSmartphone,
  GiVrHeadset,
  GiGamepad,
  GiLevelThree,
  GiWireframeGlobe,
} from "react-icons/gi";
import { BiVideoRecording } from "react-icons/bi";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListIcon,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./SkillsStyles";

const Skills = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Skills</SectionTitle>
    <List>
      <ListItem>
        <ListIcon aria-hidden="true">
          <GiVrHeadset size="4rem" />
        </ListIcon>
        <ListContainer>
          <ListTitle>Mixed Reality</ListTitle>
          <ListParagraph>
            Augmented Reality <br />
            Virtual Reality <br />
            Tracking Techniques 
            ...
          </ListParagraph>
        </ListContainer>
      </ListItem>

      <ListItem>
        <ListIcon aria-hidden="true">
          <GiGamepad size="4rem" />
        </ListIcon>
        <ListContainer>
          <ListTitle>Game</ListTitle>
          <ListParagraph>
            Unity <br />
            OGRE <br />
            PyGame 
            ...
          </ListParagraph>
        </ListContainer>
      </ListItem>

      <ListItem>
        <ListIcon aria-hidden="true">
          <GiWireframeGlobe size="4rem" />
        </ListIcon>
        <ListContainer>
          <ListTitle>Web</ListTitle>
          <ListParagraph>
            .NET 5 <br />
            React.js <br />
            Databases 
            ...
          </ListParagraph>        </ListContainer>
      </ListItem>

      <ListItem>
        <ListIcon aria-hidden="true">
          <GiLevelThree size="4rem" />
        </ListIcon>
        <ListContainer>
          <ListTitle>Prototyping</ListTitle>
          <ListParagraph>
            3D-Printing <br />
            Electronics <br />
            CAD 
            ...
          </ListParagraph>        </ListContainer>
      </ListItem>

      <ListItem>
        <ListIcon aria-hidden="true">
          <GiSmartphone size="4rem" />
        </ListIcon>
        <ListContainer>
          <ListTitle>Mobile</ListTitle>
          <ListParagraph>
            Android <br />
            .NET 5 MAUI 
            ...
          </ListParagraph>        </ListContainer>
      </ListItem>

      <ListItem>
        <ListIcon aria-hidden="true">
          <BiVideoRecording size="4rem" />
        </ListIcon>
        <ListContainer>
          <ListTitle>AV</ListTitle>
          <ListParagraph>
            Photogrammetry <br />
            Streaming <br />
            Recording 
            ...
          </ListParagraph>        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Skills;
