import React from "react";

import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AcomplishmentsStyles";

import { RiMedalLine } from "react-icons/ri";
import { GiGamepad } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi";

const iconStyles = { marginTop: "auto"};
const iconSize = "8rem";

const Acomplishments = () => (
  
  <Section  id="acomplishments">
    <SectionTitle>Achievements</SectionTitle>
    <Boxes>
      <Box>
        <div>
          <BoxNum>Austrian CG Award 2015</BoxNum>
          <BoxText>
            Best Game
            <br />
            Project Yokaisho
          </BoxText>
        </div>
        <GiGamepad size={iconSize} style={iconStyles} />
      </Box>

      <Box>
        <div>
          <BoxNum>Austrian CG Award 2016</BoxNum>
          <BoxText>
            Best Game, Best Student Project
            <br />
            Projekt NIVA
          </BoxText>
        </div>
        <GiGamepad size={iconSize}  style={iconStyles} />
      </Box>

      <Box>
        <div>
          <BoxNum>Order for Disaster Relief</BoxNum>
          <BoxText>State of Salzburg</BoxText>
        </div>
        <RiMedalLine size={iconSize}  style={iconStyles} />
      </Box>

      <Box>
        <div>
          <BoxNum>Science Award 2017</BoxNum>
          <BoxText>AK Salzburg</BoxText>
        </div>
        <HiAcademicCap size={iconSize}  style={iconStyles} />
      </Box>
    </Boxes>
    <SectionDivider />
  </Section>
);

export default Acomplishments;
