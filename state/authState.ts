import { userType } from "@/types/userType";
import { atom } from "recoil";

export const authState = atom<userType>({
  key: "authState",
  default: {
    email: "",
    nickName: "",
    profileImageUrl: "",
    auth: false,
    token: "",
    uid: "",
  },
});
