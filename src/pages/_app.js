import '../styles/fonts.css';
import { LanguageProvider } from '../i18n/LanguageContext';
import Theme from '../styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      {/* Pages can set `Page.defaultLang` for their static HTML (default: en)
          and `Page.fixedLang` to skip browser-language detection. */}
      <LanguageProvider defaultLang={Component.defaultLang || 'en'} fixed={Boolean(Component.fixedLang)}>
        <Component {...pageProps} />
      </LanguageProvider>
    </Theme>
  );
}
