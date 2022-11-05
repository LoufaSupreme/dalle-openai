import { Configuration, OpenAIApi } from 'openai'
import { writeFileSync } from 'fs'
import * as dotenv from 'dotenv'
dotenv.config();
import fetch from 'node-fetch';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt = "horse running on water";

const result = await openai.createImage({
    prompt,
    n: 1,
    size: '256x256'
})

const url = result.data.data[0].url;

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() );
writeFileSync(`./images/${Date.now()}.png`, buffer);