import React,{useState} from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "@/components/AppLayout";
import MarkDown from 'react-markdown' 

export default function NewPost(props) {

  const [postContent,setPostContent]=useState("")
  console.log("NEW POST PROPS",props)

  const handleClick = async () => {
    const response=await fetch(`/api/generatepost`,{
      method:"POST"
    });
    const json=await response.json();
    console.log("RESULT: ",json)
    setPostContent(json.post.postContent)

  };
  return (
    <div>
      <h1>This is new post</h1>

      <button className="btn" onClick={handleClick}>
        Generate
      </button>
      <MarkDown>
        {postContent}
      </MarkDown>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    return {
      props: {
        test: "this is a test",
      },
    };
  },
});
