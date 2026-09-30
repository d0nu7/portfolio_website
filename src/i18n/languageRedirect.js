/*
 * First-visit language routing, run as an inline script in <head> before
 * anything renders (see _document), so there is no flash of the wrong
 * language.
 *
 * - A saved choice (the DE/EN switch) always wins.
 * - Otherwise the browser's preferred languages decide; anything that is
 *   neither German nor English falls back to English.
 * - Crawlers are never redirected, so every language version stays
 *   indexable; hreflang tells search engines which is which.
 */
export const LANGUAGE_STORAGE_KEY = 'radi-language';

export const languageRedirectScript = (current, alternates) => `(function(){try{
var cur=${JSON.stringify(current)},alt=${JSON.stringify(alternates)};
if(/bot|crawl|spider|slurp|google|bing|yandex|baidu|duckduck|facebookexternalhit|linkedin|embed|preview|lighthouse|headless/i.test(navigator.userAgent))return;
var want=null;try{want=localStorage.getItem(${JSON.stringify(LANGUAGE_STORAGE_KEY)});}catch(e){}
if(want!=="de"&&want!=="en"){var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"en"];want="en";
for(var i=0;i<ls.length;i++){var l=String(ls[i]).slice(0,2).toLowerCase();if(l==="de"||l==="en"){want=l;break;}}}
if(want!==cur&&alt[want])location.replace(alt[want]+location.hash);
}catch(e){}})();`;
