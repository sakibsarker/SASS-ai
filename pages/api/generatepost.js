import OpenAI from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const topic = "dog owership";
  const keywords = "first-time dog ower, puppy diet";

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
        Generate  me a blog post on the following topic delimited by triple hyphens:
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
  console.log(completion.choices[0].message.content)
  res.status(200).json({ name: "Generate post" });
}
