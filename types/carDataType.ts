export interface carDataType {
  color: string;
  feature: CarFeatureType;
  number: string;
  latitude: number;
  longitude: number;
  available: boolean;
  charge: number;
  actualReturnedZone: number;
  smartKey: string;
  frameInfo: CarFrameDataType;
  washTime: string;
  place: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    zoneAddress: string;
  };
}

export interface CarFrameDataType {
  createDate: string | null;
  updateDate: string | null;
  id: number;
  carBrand: {
    id: number;
    foreignCar: boolean;
    brandName: string;
    brandImage: string;
  }
  foreignCar: boolean;
  carName: string;
  capacity: string;
  recommend: boolean;
  defaultPrice: number;
  distancePrice: number;
  carType: string;
  appearance: string;
  manual: string;
  image: string;
}

export interface carListType {
  carName: string;
  carBrand: string;
  carImage: string;
  billitaZone: string;
  defaultPrice: number;
  canBook: boolean;
  purchaseStatus: string;
}

export interface carListbyBrandDataType {
  vehicleId: number;
  carName: string;
  imageUrl: string;
  charge: number;
  defaultPrice: number;
  distancePrice: number;
  carBrand: string;
  zoneAddress: string;
  billitaZone: string;
}

export interface carInMapType {
  vehicleId: number;
  carName: string;
  carBrandName: string;
  canBook: boolean;
  defaultPrice: number;
  vehicleImage: string;
  distancePrice: number;
  currentCharge: number;
}

export interface BookListDataType {
  bookId : number;
  carBrand : string;
  carName : string;
  capacity : string;
  defaultPrice : number,
  distancePrice : number,
  charge : number,
  startDate : string
  endDate : string
  billitaZone : string,
  imageUrl : string,
  insuranceId : number,
}

export interface CarFeatureType {
  열선시트: boolean;
  썬루프: boolean;
  가죽시트: boolean;
  스마트키: boolean;
  통풍시트: boolean;
  내비게이션: boolean;
  자동에어컨: boolean;
  후방카메라: boolean;
  헤드램프: boolean;
  주차감지센서: boolean;
};