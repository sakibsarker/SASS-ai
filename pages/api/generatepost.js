import clientPromise from "@/lib/mongodb";
import { withApiAuthRequired,getSession } from "@auth0/nextjs-auth0";
import OpenAI from "openai";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  console.log("user:", user);
  const client = await clientPromise;
  const db = client.db("aiblogpost");

  const userProfile = await db.collection("users").findOne(
    {
      auth0Id: user.sub,
    });

    if(!userProfile?.availableTokens){
      res.status(403);
      return;

    }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const {topic,keywords}=req.body;



  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an SEO friendly blog post generator called BlogGenerator. You are designed to output markdown without forntmatter.",
      },
      {
        role: "user",
        content: `
        Generate  me a long and detailed blog post on the following topic delimited by triple hyphens:
        ---
         ${topic}
        ---
        Targeting the following keywords delimited by triple hyphens:
        ---
        ${keywords}
        ---
        `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const postContent=completion.choices[0].message.content

  const seoResponse=await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages:[
      {
        role: "system",
        content:
          "You are an SEO friendly blog post generator called BlogGenerator. You are designed to output JSON. Do not include HTML tags in your output.",
      },
      {
        role: "user",
        content: `
        Generate an SEO friendly title and SEO friendly meta description for the following blog post:
        ${postContent}
        ---
        The output json must be in the following format:
        {
          "title":"example title",
          "metaDescription":"example meta description"
        }
        `,
      },
    ],
    response_format: { type: "json_object" },
  })
  const {title,metaDescription}=seoResponse.choices[0].message.content
  console.log(seoResponse.choices[0].message.content)
  console.log(seoResponse.title)
  console.log(seoResponse.metaDescription)
  // console.log(completion.choices[0].message.content)
  console.log(title)
  console.log(metaDescription)
  await db.collection("users").updateOne({
    auth0Id:user.sub
  },{
    $inc: {
      availableTokens: -1,
    },
  });

  const post=await db.collection("posts").insertOne({
    postContent,
    title,
    metaDescription,
    topic,
    keywords,
    userId:userProfile._id,
    created:new Date(),
  })
  res.status(200).json({post:{postContent,title,metaDescription}});
});
