import React, { use, useEffect, useState } from 'react'
import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout'
import RentalLogWrapper from '@/components/pages/rental/RentalLogWrapper'
import { useRouter } from 'next/router'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import CarList from '@/components/pages/car/CarList'
import { carListType } from '@/types/carDataType'
import SectionTitle from '@/components/ui/SectionTitle'

function BrandSort(props: { data: carListType[] }) {

  const router = useRouter()
  const { brandName } = router.query;
  const [brand, setBrand] = useState<string>('')
  const { data } = props;
  console.log(brandName)
  console.log(data)

  useEffect(() => {
    if (brandName) {
      setBrand(brandName as string)
    }
  }, [brandName])


  return (
    <main>
      <SectionTitle fontSize={0.8}>{`${brand} 브랜드`}</SectionTitle>
      <CarList data={data}/>
    </main>
  )
}

BrandSort.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="브랜드별 조회">{Page}</SimpleBackLayout>
}

export default BrandSort

export const getServerSideProps = async (context:Params) => {

  const { brandName } = context.query;

  // const res = await fetch(`https://api-billita.xyz/frame/brands/${brandName}`);
  // const data = await res.json();

  const dummy:carListType[] = [
    {
      id: 1,
      carBrand: "Tesla",
      carName: "Model 3",
      carImage:
      "https://storage.googleapis.com/bucket_billita_vehicle/ac6050b590c42d7f/Tesla/%ED%85%8C%EC%8A%AC%EB%9D%BC_%EB%AA%A8%EB%8D%B8S_Deep%20Blue%20Metallic.png",
      defaultPrice: 27000,
      billitaZone: "센텀프리미어 호텔",
      canBook: true,
    },
    {
      id: 2,
      carBrand: "Benz",
      carName: "Model 3",
      carImage:
      "https://storage.googleapis.com/bucket_billita_vehicle/ac6050b590c42d7f/Tesla/%ED%85%8C%EC%8A%AC%EB%9D%BC_%EB%AA%A8%EB%8D%B8S_Deep%20Blue%20Metallic.png",
      defaultPrice: 27000,
      billitaZone: "센텀프리미어 호텔",
      canBook: true,
    },
  ]

  return {
    props: {
      data: dummy,
    },
  }
}