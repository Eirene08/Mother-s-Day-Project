import OpenAI from "openai";
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import FontFaceObserver from 'fontfaceobserver';


const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

async function generateMessage(prompt) {
    try {
        const response = await axios.post("https://api.deepseek.com/v1/chat/completions", {
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant"
                },
                {
                    role: "user",
                    content: prompt
                },
            ],
            "model": "deepseek-chat",
        }, {
            headers: {
                "Authorization": "Bearer sk-4dc49edb7df742fcba235616b925b4ad",
                "Content-Type": "application/json",
            }
        });

        return response.data?.choices?.[0]?.message?.content || "Kasih sayangmu abadi, Ibu. pelita hidupku yang takkan pernah padam. Selamat Hari Ibu! ❤";
    } catch (error) {
        console.error("Error:", error);
        throw new Error("AI Error coy");
    }
}

app.post('/chat/completions', async (req, res) => {
    const prompt = req.body.prompt || "Buatkan ucapan Happy Mother's Day yang menyentuh hati dan hanya satu kalimat saja";
    
    try {
        const message = await generateMessage(prompt);
        res.json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: '<sk-4dc49edb7df742fcba235616b925b4ad>',
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
}

// main();
