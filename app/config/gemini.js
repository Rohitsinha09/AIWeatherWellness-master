/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";

  
  const apiKey =process.env.NEXT_PUBLIC_NOT_SECRET_MESSAGE;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: 
    `When a sender send a  message  that is Hii then only  reply with message 'Welcome to AiWeatherWellness! 
    How can I help you?' with weather Icon emoji and Do not include this welcome 
    message in subsequent responses during the conversation.If there is no reply from user
    after 1 minute, send a message  to user Feel free to ask anything! 
    If you have any confusion ?Don't Worry You can choose any of the Given templates
     circle-ICon  Suggest Some Healthy Diet Options for Hot and Dry Weather Condition 
    What precautions should be taken to reduce the risk of heart disease? then  Suggest some exercises and meditations for staying healthy and  Happy 
    Explain me five different techniques for boosting cognitive function? .And also send 
     emoji  along with responses during simple conversation like about diet ,health,daily life but not in technical questions  and also send each circle icon instead each  number \
       `,
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  }
  
  export default run;