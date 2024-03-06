import { checkApiLimit, increaseApiLimit } from '@/database/actions/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
        You are a code generator.
        You must answer only in markdown code snippets.
        In the code put some comments to explain the code.
        After each code, give an explanation of the code.
    `
}

export async function POST(req: Request){
    try{
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        if(!openai.apiKey){
            return new NextResponse("OpenAI API key is missing", {status: 500});
        }
        if(!messages){
            return new NextResponse("Messages are required", {status: 400});
        }
        const freeTrial = await checkApiLimit();
        if(!freeTrial){
            return new NextResponse("You have exceeded the free trial limit", {status: 403});
        }
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });

        await increaseApiLimit();

        return NextResponse.json(response.choices[0].message, {status: 200});

    } catch(error){
        console.log("[CODE_ERROR]: ", error);
        return new NextResponse("Internal error", {status: 500});
    }
}