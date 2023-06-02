import { timeType } from "@/types/rentalDataType";
import dayjs from "dayjs";
import { atom } from "recoil";

export const nowTimeState = atom<timeType>({
  key: "nowTimeState",
  default: {
    startTime: dayjs().add(10, "minute").format("YYYY-MM-DD HH:mm"),
    endTime: dayjs().add(70, "minute").format("YYYY-MM-DD HH:mm"),
  },
});
