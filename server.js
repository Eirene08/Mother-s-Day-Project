import OpenAI from "openai";
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-message', async (req, res) => {
    const prompt = req.body.prompt || "Buatkan ucapan Happy Mother's Day yang menyentuh hati dan hanya satu kalimat saja.";

    try {
        const response = await axios.post("https://api.deepseek.com/", {
            prompt: prompt,
            max_tokens: 120,
        }, {
            headers: {
                "Authorization": "Bearer sk-ecebf4058eb244a48e665948a75e8808",
                "Content-Type": "application/json",
            }
        });

        const message = response.data?.choices?.[0]?.text || "Kasih sayangmu abadi, Ibu, pelita hidupku yang takkan pernah padam; Selamat Hari Ibu!";
        res.json({ message });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "AI Error coy"
        });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: '<sk-ecebf4058eb244a48e665948a75e8808>',
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
}

main();
