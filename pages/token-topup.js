import React from 'react'
import { AppLayout } from '@/components/AppLayout'

export default function TokenTopup() {
  return (
    <div>TokenTopup</div>
  )
}


TokenTopup.getLayout=function getLayout(page,pageProps){
  return<AppLayout {...pageProps}>{page}</AppLayout>
}