import '../styles/fonts.css';
import LanguageHint from '../components/LanguageHint/LanguageHint';
import { LanguageProvider } from '../i18n/LanguageContext';
import Theme from '../styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      {/* Each page declares its language and route (see src/i18n/routes.js). */}
      <LanguageProvider lang={Component.lang || 'en'} route={Component.route || null}>
        <Component {...pageProps} />
        <LanguageHint />
      </LanguageProvider>
    </Theme>
  );
}
