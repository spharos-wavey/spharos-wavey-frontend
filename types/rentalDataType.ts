export interface RentalDataType {
  rentalId: number;
  carModel: string;
  carBrand: string;
  capacity: number;
  defaultPrice: number;
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

export interface BillitaZoneListType extends Array<billitaZoneType> {}

