import React from 'react'
import { AppLayout } from '@/components/AppLayout'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getAppProps } from '@/utils/getAppProps';

export default function TokenTopup() {
  const handleClick=async()=>{
    try{
      const result=await fetch(`/api/addToken`,{
        method:'POST',
         
      })
      const json=await result.json();
      console.log("RESULT",json)
    }catch (error) {
      console.log(error.message);
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


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
   const props=await getAppProps(ctx)
   return{
    props,
   }
  },
});