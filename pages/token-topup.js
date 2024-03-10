import React from 'react'
import { AppLayout } from '@/components/AppLayout'

export default function TokenTopup() {
  const handleClick=async()=>{
    try{
      await fetch(`/api/addToken`,{
        method:'POST',
         
      })

    }catch (error) {
      setError(error.message);
    }
   
  }

  return (
    <div>
      <h1>this is token topup</h1>
      <button className='btn' onClick={handleClick}>Add token</button>
    </div>
  )
}


TokenTopup.getLayout=function getLayout(page,pageProps){
  return<AppLayout {...pageProps}>{page}</AppLayout>
}