import { locationType } from "@/types/location";
import { atom } from "recoil";

export const locationState = atom<locationType>({
  key: "locationState",
  default: {
    latitude: 0,
    longitude: 0,
  },
});
