export interface eventBannerType {
  carId: number,
  carName: string,
  carBrand: string,
  carBrandImage: string,
  carImage: string,
}

export interface mainVehicleCardType {
  id: number,
  carName: string,
  carBrand: string,
  carImage: string,
  pickUpArea: string
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