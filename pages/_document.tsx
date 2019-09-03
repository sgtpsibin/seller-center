import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://sdks.shopifycdn.com/polaris/3.21.1/polaris.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="icon"
            href="https://mcdn.thitruongsi.com/images/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          />
        </Head>
        <body>
          <Main />
          {/* <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script> */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
