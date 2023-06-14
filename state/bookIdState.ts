import { atom } from "recoil";
interface BookIdType {
  bookId: number;
}

export const bookIdState = atom<BookIdType>({
  key: "userRentalState",
  default: {
    bookId: 0,
  },
});
