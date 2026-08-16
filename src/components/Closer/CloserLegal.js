import React from 'react';
import styled from 'styled-components';

const LegalRoot = styled.div`
  color: rgba(242, 243, 245, 0.78);
  font-size: 1.4rem;
  line-height: 1.62;
  overflow-wrap: anywhere;
  -webkit-user-select: text;
  user-select: text;

  section + section {
    margin-top: 2.6rem;
  }

  h3 {
    color: #f2f3f5;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    margin: 0 0 0.8rem;
  }

  p {
    margin: 0;
    white-space: pre-line;
  }

  p + p,
  ul + p,
  p + ul {
    margin-top: 1rem;
  }

  ul {
    margin-bottom: 0;
    padding-left: 2rem;
  }

  li + li {
    margin-top: 0.5rem;
  }

  a {
    color: ${({ $accent }) => $accent || '#13adc7'};
    text-underline-offset: 0.2em;
  }

  a:focus-visible {
    border-radius: 2px;
    outline: 2px solid rgba(242, 243, 245, 0.85);
    outline-offset: 3px;
  }
`;

const Updated = styled.p`
  color: rgba(242, 243, 245, 0.55);
  font-size: 1.2rem;
  letter-spacing: 0.04em;
  margin-top: 2.6rem !important;
`;

export const LEGAL_TITLES = {
  imprint: { de: 'Impressum', en: 'Imprint' },
  privacy: { de: 'Datenschutz', en: 'Privacy' },
};

const LAST_UPDATED = { de: 'Stand: 16. August 2026', en: 'Last updated: 16 August 2026' };

function Imprint({ lang, accent }) {
  const isGerman = lang !== 'en';

  return (
    <LegalRoot $accent={accent}>
      <section>
        <h3>{isGerman ? 'Diensteanbieter und Medieninhaber' : 'Service provider and media owner'}</h3>
        <p>
          Radomir Dinic BSc MSc{`\n`}
          Pingitzzerkai 6a/6{`\n`}
          A-5400 Hallein{`\n`}
          Austria
        </p>
      </section>

      <section>
        <h3>{isGerman ? 'Kontakt' : 'Contact'}</h3>
        <p>
          <a href="mailto:contact@radi.solutions">contact@radi.solutions</a>
        </p>
      </section>

      <section>
        <h3>{isGerman ? 'Inhaltliche Ausrichtung' : 'Editorial purpose'}</h3>
        <p>
          {isGerman
            ? 'Persönliches Portfolio sowie Bereitstellung des lokalen Gesprächsspiels CLOSER.'
            : 'Personal portfolio and provision of the local conversation game CLOSER.'}
        </p>
      </section>

      <Updated>{isGerman ? LAST_UPDATED.de : LAST_UPDATED.en}</Updated>
    </LegalRoot>
  );
}

function Privacy({ lang, accent }) {
  const isGerman = lang !== 'en';

  if (isGerman) {
    return (
      <LegalRoot $accent={accent}>
        <section>
          <h3>Verantwortlicher</h3>
          <p>
            Radomir Dinic BSc MSc{`\n`}
            Pingitzzerkai 6a/6, A-5400 Hallein, Österreich{`\n`}
            <a href="mailto:contact@radi.solutions">contact@radi.solutions</a>
          </p>
        </section>

        <section>
          <h3>Was CLOSER lokal speichert</h3>
          <p>
            CLOSER funktioniert ohne Konto. Auf diesem Gerät werden nur die von euch gewählten Namen,
            Spieleinstellungen, Fortschritt und lokale Hinweiseinstellungen gespeichert. Das ermöglicht
            das Fortsetzen eines Spiels und merkt sich ausgeblendete Hinweise.
          </p>
          <p>
            Eure Antworten werden weder eingegeben noch aufgezeichnet oder gespeichert. CLOSER verwendet
            derzeit keine Analyse- oder Werbedienste, setzt keine Cookies und lädt keine Schriftarten von
            Drittanbietern.
          </p>
          <p>
            Die lokalen Daten bleiben im Browser, bis ihr im Menü „Lokale Daten löschen“ wählt oder die
            Website-Daten im Browser entfernt. Ihr könnt CLOSER auch ohne Namen verwenden.
          </p>
        </section>

        <section>
          <h3>Hosting und technische Verbindungsdaten</h3>
          <p>
            Die Website wird über Vercel bereitgestellt. Beim Aufruf kann Vercel technische
            Verbindungs- und Nutzungsdaten verarbeiten, etwa IP-Adresse, Browser- und Geräteinformationen,
            Zeitpunkt und Ziel der Anfrage sowie Betriebs- und Sicherheitsprotokolle. Das ist für die
            sichere, stabile und effiziente Bereitstellung der Website erforderlich.
          </p>
          <p>
            Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und zuverlässigen Angebot
            gemäß Art. 6 Abs. 1 lit. f DSGVO. Vercel kann Daten auch außerhalb des EWR, insbesondere in
            den USA, verarbeiten. Für solche Übermittlungen sieht Vercel unter anderem die
            EU-Standardvertragsklauseln vor.
          </p>
          <p>
            Technische Protokolle werden nur so lange aufbewahrt, wie es für Betrieb und Sicherheit
            erforderlich ist oder gesetzliche Pflichten bestehen. Die konkrete Dauer kann von der
            eingesetzten Vercel-Leistung und deren jeweils geltenden Einstellungen abhängen.
          </p>
          <p>
            Weitere Informationen:{' '}
            <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">
              Datenschutzhinweise von Vercel
            </a>
          </p>
        </section>

        <section>
          <h3>Eure Rechte</h3>
          <p>
            Soweit die gesetzlichen Voraussetzungen vorliegen, habt ihr das Recht auf Auskunft,
            Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
            Wendet euch dafür an die oben angegebene Kontaktadresse.
          </p>
          <p>
            Ihr könnt euch außerdem bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere bei
            der{' '}
            <a href="https://dsb.gv.at/" target="_blank" rel="noopener noreferrer">
              Österreichischen Datenschutzbehörde
            </a>
            .
          </p>
        </section>

        <Updated>{LAST_UPDATED.de}</Updated>
      </LegalRoot>
    );
  }

  return (
    <LegalRoot $accent={accent}>
      <section>
        <h3>Controller</h3>
        <p>
          Radomir Dinic BSc MSc{`\n`}
          Pingitzzerkai 6a/6, A-5400 Hallein, Austria{`\n`}
          <a href="mailto:contact@radi.solutions">contact@radi.solutions</a>
        </p>
      </section>

      <section>
        <h3>What CLOSER stores locally</h3>
        <p>
          CLOSER works without an account. It only stores the names you choose, game settings, progress,
          and local notice preferences on this device. This lets you resume a game and remembers dismissed
          notices.
        </p>
        <p>
          Your answers are not entered, recorded, or stored. CLOSER currently uses no analytics or
          advertising services, sets no cookies, and loads no fonts from third parties.
        </p>
        <p>
          Local data remains in the browser until you choose “Delete local data” in the menu or remove the
          website data in your browser. You can also use CLOSER without entering names.
        </p>
      </section>

      <section>
        <h3>Hosting and technical connection data</h3>
        <p>
          The website is delivered through Vercel. When you open it, Vercel may process technical
          connection and usage data such as the IP address, browser and device information, the time and
          destination of the request, and operational and security logs. This is necessary to deliver the
          website securely, reliably, and efficiently.
        </p>
        <p>
          The legal basis is our legitimate interest in providing a secure and reliable service under
          Article 6(1)(f) GDPR. Vercel may also process data outside the EEA, particularly in the United
          States. Vercel provides safeguards including the EU Standard Contractual Clauses for such
          transfers.
        </p>
        <p>
          Technical logs are retained only for as long as required for operation and security or by law.
          The precise period can depend on the Vercel service and the settings applicable at that time.
        </p>
        <p>
          More information:{' '}
          <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">
            Vercel Privacy Notice
          </a>
        </p>
      </section>

      <section>
        <h3>Your rights</h3>
        <p>
          Where the legal requirements are met, you have rights of access, rectification, erasure,
          restriction, data portability, and objection. Contact us at the address above to exercise them.
        </p>
        <p>
          You may also lodge a complaint with a data protection authority, in particular the{' '}
          <a href="https://dsb.gv.at/" target="_blank" rel="noopener noreferrer">
            Austrian Data Protection Authority
          </a>
          .
        </p>
      </section>

      <Updated>{LAST_UPDATED.en}</Updated>
    </LegalRoot>
  );
}

export default function CloserLegal({ view = 'imprint', lang = 'de', accent }) {
  return view === 'privacy' ? (
    <Privacy lang={lang} accent={accent} />
  ) : (
    <Imprint lang={lang} accent={accent} />
  );
}
