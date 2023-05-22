import React from 'react'
import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout'
import ReturnMandatoryTab from '@/components/pages/return/ReturnMandatoryTab'

export default function Page() {
  return (
    <main>
      <ReturnMandatoryTab />
    </main>
  )
}


Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="반납 하기">{Page}</SimpleBackLayout>
}