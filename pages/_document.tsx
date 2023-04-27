import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/**
 * document 문서 커스텀
 * _document는 _app 다음에 실행
 * 무조건 서버에서 실행되는 파일이므로 브라우저 API / 이벤트 핸들러 등 포함된 코드들은 실행되지 않음
 * <Main /> 태그를 제외한 부분은 브라우저에서 실행되지 않기 때문에 이곳에는 비즈니스 로직을 추가하면 안됨
 * <Head> 태그에는 모든 문서에 공통으로 적용할 (charset, 뷰포트 메타태그 등)이 들어감
 */
