import React from 'react'
import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout'
import RentalLogWrapper from '@/components/pages/rental/RentalLogWrapper'

export default function Page() {
  return (
    <main>
      <RentalLogWrapper />
    </main>
  )
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 내용 상세">{Page}</SimpleBackLayout>
}