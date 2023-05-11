export interface carDataType {
  color: string;
  feature: {
    열선: boolean;
    썬루프: boolean;
  };
  number: string;
  latitude: number;
  longitude: number;
  available: boolean;
  charge: number;
  lastZone: number;
  smartKey: string;
  frameInfo: {
    createDate: string | null;
    updateDate: string | null;
    id: number;
    maker: string;
    foreignCar: boolean;
    name: string;
    capacity: string;
    recommend: boolean;
    defaultPrice: number;
    distancePrice: number;
    carType: string;
    appearance: string;
    manuel: string;
    image: string;
  };
  washTime: string;
  place: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  };
}
