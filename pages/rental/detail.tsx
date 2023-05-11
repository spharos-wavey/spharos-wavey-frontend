import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout'
import React from 'react'
import style from "./detail.module.css";
import RentalWrapper from '@/components/pages/rental/RentalWrapper';


export default function Page() {
  return (
    <main>
      <RentalWrapper />
    </main>
  )
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 내용 상세">{Page}</SimpleBackLayout>
}