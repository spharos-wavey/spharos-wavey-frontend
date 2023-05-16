export interface rentalTopDataType {
  rentalId: number | undefined;
  carModel: string | undefined;
  maker: string | undefined;
  charge: number | undefined;
  imageUrl: string | undefined;
}

export interface rentalMiddleDataType {
  fare: number | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  totalRentTime: string | undefined;
  billitazone: string | undefined;
  rentalfee: number | undefined;
  insurancefee: number | undefined;
}