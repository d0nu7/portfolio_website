import home from './home';
import { useLanguage } from './LanguageContext';

// Homepage/chrome strings in the current language, plus the language itself.
const useHomeCopy = () => {
  const { lang } = useLanguage();
  return { lang, t: home[lang] || home.en };
};

export default useHomeCopy;
