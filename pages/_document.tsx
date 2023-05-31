import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
const KAKAO_LOGIN_SDK_URL = `//t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js`;

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const sheets = new ServerStyleSheet();

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
          <Script src={KAKAO_LOGIN_SDK_URL} strategy="beforeInteractive" />
        </body>
      </Html>
    );
  }
}
