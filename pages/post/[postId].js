import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Post(props) {
  console.log('NEW PROPS PAGE',props)
  return (
    <div>Post page</div>
  )
}


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return {
      props: {
        test: 'this is a test',
      },
    };
  },
});