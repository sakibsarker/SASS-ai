import React,{useState} from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "@/components/AppLayout";
import MarkDown from 'react-markdown' 
import { useRouter } from "next/router";
import { getAppProps } from "@/utils/getAppProps";

export default function NewPost(props) {
  const [topic,setTopic]=useState("")
  const [keywords,setKeywords]=useState("")
  const router=useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(`/api/generatepost`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ topic, keywords })
      });

      if (!response.ok) {
        throw new Error('Failed to generate post. Please try again.');
      }

      const json = await response.json();
      console.log(json)
      if(json?.postId){
        router.push(`/post/${json.postId}`);
      }
   
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>
              Generate a blog post on the topic of:
            </strong>
          </label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={e=>setTopic(e.target.value)}/>

        </div>
        <div>
        <label>
            <strong>
              Targeting the following keywords:
            </strong>
          </label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={e=>setKeywords(e.target.value)}/>
        </div>
      <button type="submit" className="btn">
        Generate
      </button>
        
      </form>
     

     
      {/* <MarkDown>
        {postContent}
      </MarkDown> */}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
   const props=await getAppProps(ctx)
   return{
    props,
   }
  },
});
