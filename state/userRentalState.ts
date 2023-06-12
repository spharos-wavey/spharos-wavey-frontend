import { atom } from "recoil";
interface UserRentalStateType {
  canUserBook: boolean;
}

export const userRentalState = atom<UserRentalStateType>({
  key: "userRentalState",
  default: {
    canUserBook: true,
  },
});
