import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

/**
 * _app.tsx: server only file
 * clinet 로직 사용 불가(EventListener, window, dom ..)
 * global css 적용됨
 * 레이아웃 설정 통해 페이지 전환시 특정 레이아웃과 그 상태값 유지 가능함
 *
 * props
 * component: 현재 페이지 의미
 * pageProps: DataFetching 메서드를 통해 미리 가져온 초기 객체
 * (getInitialProps, getStaticProps, getServerSideProps 중 하나를 통해 패칭한 초기 속성)
 */
