import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'agent.html'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Could not load agent.html');
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.post('/api', async (req, res) => {
  const { action, answers } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set in .env' });
  }

  try {
    let system = '';
    let userMessage = '';

    if (action === 'generate-ideas') {
      system = `You are an expert UGC (User Generated Content) strategist for TikTok and YouTube Shorts.
Generate exactly 5 highly specific, scroll-stopping video ideas tailored to the creator's mood, recent life events, and preferred style.
Each idea must be grounded in their actual experience — not generic.
Return ONLY a valid JSON array. No markdown, no explanation, just raw JSON.
Schema: [{ "id": 1, "title": "...", "angle": "...", "hook": "..." }]
- title: catchy video title (max 60 chars)
- angle: the unique storytelling angle or perspective (1 sentence)
- hook: the opening 3-second line that stops the scroll (complete sentence, spoken aloud)`;

      userMessage = `Creator's mood today: ${answers.mood}
Recent life activity/experience: ${answers.activity}
Preferred video style: ${answers.videoType}

Generate 5 tailored video ideas that feel personal and authentic to this specific creator right now.`;

    } else if (action === 'generate-script') {
      system = `You are an expert short-form video script writer for TikTok and YouTube Shorts.
Write a complete, production-ready script optimized for maximum engagement and retention.
Return ONLY a valid JSON object. No markdown, no explanation, just raw JSON.
Schema: {
  "hook": "...",
  "contentBullets": ["...", "...", "..."],
  "cta": "...",
  "hashtags": ["...", "..."]
}
- hook: the exact opening line (first 3 seconds), punchy and scroll-stopping
- contentBullets: 4-6 specific talking points that deliver real value, in order
- cta: a single, specific call to action (comment, follow, share, etc.)
- hashtags: 10-15 hashtags optimized for both TikTok and YouTube Shorts, mix of niche and broad`;

      userMessage = `Video idea: ${answers.selectedIdea.title}
Angle: ${answers.selectedIdea.angle}
Planned hook: ${answers.selectedIdea.hook}
Creator mood: ${answers.mood}
Creator's recent experience: ${answers.activity}
Video style: ${answers.videoType}

Write a complete, authentic script that sounds like a real person — not corporate.`;

    } else if (action === 'reactive-response') {
      system = `You are a fun, real UGC content agent having a casual conversation with a creator.
React to what they just shared in 1-2 sentences MAX.
Rules:
- Sound like a real person, not a bot — no corporate energy
- Reference something specific they actually said
- Match their energy (hyped → hype back; chill → stay chill; stressed → acknowledge it)
- NEVER open with generic filler like "That's awesome!", "Love that!", "Great!", "Amazing!", "Wow!"
- Do NOT ask any question — just react and vibe
- Keep it punchy and short`;

      const contextMap = {
        mood: 'their current vibe/mood for today',
        activity: 'recent life events or experiences they shared'
      };
      const questionContext = contextMap[answers.question] || 'their answer';

      userMessage = `The user was asked about ${questionContext} and said: "${answers.userAnswer}"

Write a genuine 1-2 sentence reactive comment. Return only the response text, nothing else.`;

    } else {
      return res.status(400).json({ error: 'Unknown action' });
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: userMessage }],
    });

    const content = response.content[0].text;
    res.json({ content });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`UGC Content Agent running → http://localhost:${PORT}`);
});
