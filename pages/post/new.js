import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function New(props) {
  console.log('NEW POST PROPS',props)
  return (
    <div>New</div>
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