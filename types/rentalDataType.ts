
export interface timeType {
  startTime: string;
  endTime: string;
}

export interface billitaZoneType {
  billitaZoneLat: number;
  billitaZoneName: string;
  billitaZoneLng: number;
  billitaZoneId: number;
  rentAbleAmount: number;
}

export interface BillitaZoneListType extends Array<billitaZoneType> {}

export interface IsUserRentalNowDataType {
  imageUrl: string;
  brandName: string;
  carName: string;
}

export interface MyRentalCarType{
  rentalId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  returnZoneId: number;
  price: number;
  purchaseStatus: string;
}


export interface RentalDetailType {
  rentalId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  billitaZoneId: number;
  price: number;
  finalPrice: number;
  insuranceId: number;
  paymentMethod: string;
}

export interface BillitaZoneType {
  
  latitude: number;
  longitude : number
  name : string;
  zoneAddress : string

}