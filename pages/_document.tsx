import React from "react";
import { useRouter } from "next/router";
import { Html, Head, Main, NextScript } from "next/document";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";

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
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    return (
      <Html lang="ko">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:title" content="Welcome to Billita" key="title" />
          <meta property="og:description" content="함 빌리 타보이소" key="og-desc"/>
          {/* <meta property="og:url" content={`${BASE_URL}${router.pathname}`} key="og-url"/> */}
          <meta property="og:image" content="/assets/images/common/billitaLogo.svg" key="og-image"/>
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
