import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;


export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
          crossOrigin="anonymous"
        ></Script>
        <Main />
        <NextScript />
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
