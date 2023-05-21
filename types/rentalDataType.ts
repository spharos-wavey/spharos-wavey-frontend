export interface rentalDataType {
  rentalId: number;
  carModel: string;
  maker: string;
  capacity: number;
  defaultTimePrice: number;
  distancePrice: number;
  charge: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
  billitazone: string;
  purchaseState: string;
}

export interface timeType {
  startTime: string;
  endTime: string;
}

export interface billitaZoneType {
  billitaZoneLat: number;
  billitaZoneLng: number;
  billitaZoneId: number;
  rentAbleAmount: number;
}

export interface billitaZoneListType extends Array<billitaZoneType> {}

