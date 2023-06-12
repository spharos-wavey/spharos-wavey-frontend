import { atom } from "recoil";
interface userRentalStateType {
  canUserBook: boolean;
}

export const userRentalState = atom<userRentalStateType>({
  key: "userRentalState",
  default: {
    canUserBook: false,
  },
});
