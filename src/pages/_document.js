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
    // /ki-schulungen and the CLOSER moving notice ship German HTML (the
    // training page's DE/EN switch updates <html lang> on the client);
    // everything else is English.
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
