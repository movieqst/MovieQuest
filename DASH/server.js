// server.js
// Minimal backend that powers the chat widget.
// It keeps your Anthropic API key on the server (never in the browser)
// and forwards each visitor question to Claude, with:
//   1) your site content (knowledge.md) as background context
//   2) the web_search tool turned on, so Claude can also pull in
//      current information from the open web when needed.
//
// Run:
//   npm install express cors dotenv
//   node server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-6'; // fast, inexpensive, strong general model

if (!ANTHROPIC_API_KEY) {
  console.warn('WARNING: ANTHROPIC_API_KEY is not set. Create a .env file (see .env.example).');
}

// Load your site content once at startup. Put anything you want the
// assistant to know about your business/product in knowledge.md —
// FAQs, product details, policies, pricing, etc.
let siteKnowledge = '';
try {
  siteKnowledge = fs.readFileSync(path.join(__dirname, 'knowledge.md'), 'utf8');
} catch (e) {
  console.warn('No knowledge.md found — the assistant will rely on web search only.');
}

const SYSTEM_PROMPT = `You are a helpful assistant embedded on a company website.

Answer visitor questions clearly and concisely. Prefer the site information
below when it's relevant. If a question needs current information that
isn't in the site content (news, prices, availability, anything that
changes over time), use the web_search tool to look it up before answering.

If you don't know something and can't find it, say so plainly and suggest
the visitor contact the site owner directly, rather than guessing.

--- SITE CONTENT ---
${siteKnowledge || '(no site content provided yet)'}
--- END SITE CONTENT ---`;

// In-memory conversation store, keyed by a session id the browser sends.
// Fine for a demo / low-traffic site. For production, swap this for
// redis or a database, and add real session auth.
const conversations = new Map();

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }
    const sid = sessionId || 'default';

    const history = conversations.get(sid) || [];
    history.push({ role: 'user', content: message });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: history,
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return res.status(502).json({ error: 'Upstream API error' });
    }

    const data = await response.json();

    // Collect all text blocks (there can be several if Claude used tools
    // in between), and ignore tool_use / tool_result blocks for display.
    const replyText = (data.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n\n');

    history.push({ role: 'assistant', content: data.content });
    conversations.set(sid, history);

    res.json({ reply: replyText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Chat backend running at http://localhost:${PORT}`);
});
