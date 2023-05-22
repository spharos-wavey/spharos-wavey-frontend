import React from 'react'
import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout'
import RentalLogWrapper from '@/components/pages/rental/RentalLogWrapper'

export default function brandSort() {
  return (
    <main>
      <RentalLogWrapper title="브랜드별 조회" xx={true} />
      

    </main>
  )
}

brandSort.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="차량 목록">{Page}</SimpleBackLayout>
}