import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    const page = this.props.__NEXT_DATA__?.page;
    // CLOSER's initial UI language is German (see CloserGame's initialState;
    // its own client-side effect keeps document.documentElement.lang in sync
    // whenever the in-game DE/EN switch is used -- this is only the
    // server-rendered/static starting value). Bugfix-report iteration 7,
    // BF-10: this used to fall through to 'en-GB' for every page except
    // ki-schulungen, which mismatched CLOSER's actual (German) content on
    // first paint and before hydration.
    const language = page === '/ki-schulungen' || page === '/closer' ? 'de' : 'en-GB';
    return (
      <Html lang={language}>
         <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
