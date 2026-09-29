import React from "react";

import { Section, SectionDivider, SectionText, SectionTitle } from "../../styles/GlobalComponents";
import { nowTopics } from "../../constants/constants";
import { Tile, TileText, TileTitle, Tiles } from "./NowStyles";

const Now = () => (
  <Section id="now">
    <SectionDivider divider />
    <SectionTitle>What I&apos;m working on now</SectionTitle>
    <SectionText>The older projects further down show where I come from. This is where my head is at today.</SectionText>
    <Tiles>
      {nowTopics.map((t, i) => (
        <Tile key={t.title}>
          <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <TileTitle>{t.title}</TileTitle>
          <TileText>{t.text}</TileText>
        </Tile>
      ))}
    </Tiles>
  </Section>
);

export default Now;
