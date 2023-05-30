export interface RentalDataType {
  feature : {
      JSON: boolean 
  },
place : {
      id : number;
      name : string;
      latitude : number;
      longitude : number;
      zoneAddress : string;
  },
frameInfo: RentalFrameInfoType;
  number : string;
  latitude : number;
  longitude: number;
  available : boolean
  charge : number;
  actualReturnedZone: number;
  smartKey: string;
  washTime : string;
  mileage : number;
  review : [
    {
      type : number;
      content : string;
      profile : string;
      nickName : string;
      createDate : string;
    }
  ]
}

export interface RentalFrameInfoType {
    createDate : string;
    updateDate : string;
    id : number;
    carBrand : {
        id : number;
       foreignCar : boolean;
       brandName : string;
    }
    carName : string;
    capacity : string;
    recommend : boolean;
    defaultPrice : number;
    distancePrice : number;
    carType : string;
    appearance : string;
    manual : string;
    color: string;
    image : string;
  }
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

export interface MyRentalCarType {
  rentalId: number;
  vehicleId: number;
  startDate: Date;
  endDate: Date;
}
