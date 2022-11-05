import { Configuration, OpenAIApi } from 'openai'
import { writeFileSync } from 'fs'
import * as dotenv from 'dotenv'
dotenv.config();
import fetch from 'node-fetch';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generate(prompt, n) {

    console.log(`Generating ${n} Image(s) for: ${prompt}`);

    const result = await openai.createImage({
        prompt,
        n: n,
        size: '256x256'
    })
    console.log('Image created...fetching data');
    
    const url = result.data.data[0].url;
    const imgResult = await fetch(url);
    const blob = await imgResult.blob();
    const buffer = Buffer.from( await blob.arrayBuffer() );

    const fileName = `${prompt.replace(/ /g, "-")}_${Date.now()}.png`;

    writeFileSync(`./images/${fileName}`, buffer);

    console.log('Complete');
}

// only setup to return one image at a time. n must be 1.
generate('Mike Tyson dressed as a butterfly surfing a massive ocean wave', 1);