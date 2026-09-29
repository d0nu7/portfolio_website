import React from "react";

import { ButtonLink, ButtonRow } from "../../styles/GlobalComponents";
import { Box, Text, Title } from "./ContactStyles";

const Contact = () => (
  <Box id="contact" data-reveal="">
    <Title>Got something to build, teach or untangle?</Title>
    <Text>
      A course, a workshop for your team, a prototype or just a question about AI.
      Write me, I answer my own email.
    </Text>
    <ButtonRow>
      <ButtonLink href="mailto:contact@radi.solutions">contact@radi.solutions</ButtonLink>
      <ButtonLink href="/ki-schulungen/" variant="secondary">AI trainings for teams</ButtonLink>
    </ButtonRow>
  </Box>
);

export default Contact;
