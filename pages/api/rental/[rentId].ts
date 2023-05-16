import type { NextApiRequest, NextApiResponse } from 'next'
import { rentalDataType } from '@/types/rentalDataType'
import { RentalData } from '@/datas/RentalData'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<rentalDataType>
) {
  console.log(req.query.rentId)
  const rentalId = req.query.rentId
  const result = RentalData.find((rental) => rental.rentalId === Number(rentalId))
  if (!result) {
    // res.status(404).json({ message: 'Not Found' })
    return
  }
  res.status(200).json(result)

}
