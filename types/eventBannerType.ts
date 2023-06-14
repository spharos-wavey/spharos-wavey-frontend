export interface eventBannerType {
  carId: number,
  carName: string,
  carBrand: string,
  carBrandImage: string,
  carImage: string,
}

export interface mainVehicleCardType {
  vehicleId : number
  billitaZoneId : number
  billitaZoneName : string
  carBrand : string
  carName : string
  carImage : string
}

export interface spotCardType {
  id: number,
  img: string,
  spotName: string,
  viewCount: number,
  writer: string,
  profile: string,
  distanceInMinutes: number,
}
