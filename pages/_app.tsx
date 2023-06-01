import AuthChecker from "@/components/modals/AuthChecker";
import { authState } from "@/state/authState";
import "@/styles/globals.css";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type ReactElement, type ReactNode } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <RecoilRoot>
      {
        Component.auth ? 
          <Auth>
            {getLayout(
               <Component {...pageProps} />
            )}
          </Auth>
        : 
          getLayout(
              <Component {...pageProps} />
          )
      }
    </RecoilRoot>
  );
}

function Auth({ children: page }: { children: ReactNode }) {
  
  const auth = useRecoilValue(authState);
  console.log(auth);
  if (!auth.auth) {
    return <AuthChecker />
  }
  
  return <>{page}</>;
}
