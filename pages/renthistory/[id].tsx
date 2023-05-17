import React from 'react'
import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout'
import RentalLogWrapper from '@/components/pages/rental/RentalLogWrapper'

export default function RentHistory() {
  return (
    <main>
      <RentalLogWrapper xx={true}/>
      

    </main>
  )
}

RentHistory.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 내용 상세">{Page}</SimpleBackLayout>
}