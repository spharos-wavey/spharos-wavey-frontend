import { atom } from "recoil";
interface redirectUrl {
  redirectUrl: string;
}

export const redirectionUrlState = atom<redirectUrl>({
  key: "redirectionUrlState",
  default: {
    redirectUrl : "",
  },
});
