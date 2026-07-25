# Claude chat widget for your website

A minimal, working example of a Claude-powered chat box you can embed on
any plain HTML site. It answers from your own site content first, and
falls back to a live web search for anything current.

## Files

- `server.js` — backend that calls the Claude API (keeps your API key safe)
- `widget.js` — the chat bubble UI, embeddable on any page
- `knowledge.md` — your site's content/FAQ, given to Claude as context
- `index.html` — example page showing the widget in place
- `.env.example` — copy to `.env` and add your API key

## Setup

1. **Install dependencies**
   ```
   npm init -y
   npm install express cors dotenv
   ```

2. **Add your API key**
   Copy `.env.example` to `.env` and paste in your key from
   https://platform.claude.com (Settings → API Keys).
   ```
   cp .env.example .env
   ```

3. **Edit `knowledge.md`**
   Replace the placeholder content with real info about your site —
   FAQs, pricing, policies, contact info. This is what Claude will
   prefer to answer from before reaching for web search.

4. **Run the backend**
   ```
   node server.js
   ```
   This starts a server at `http://localhost:3000`.

5. **Open `index.html`** in a browser (or serve it with any static
   file server). You should see a chat bubble in the bottom-right
   corner. Click it and ask a question.

## Going live

- Deploy `server.js` somewhere that can hold a secret (Render, Railway,
  Fly.io, a VPS, or a serverless function on Vercel/Netlify). Never put
  your API key in `widget.js` or any file served to the browser.
- In `widget.js`, change `BACKEND_URL` to your deployed backend's URL.
- Add `<script src="https://yourdomain.com/widget.js" defer></script>`
  to any page on your real site.
- The in-memory conversation store in `server.js` is fine for testing,
  but resets whenever the server restarts and doesn't scale across
  multiple server instances — swap in Redis or a database for
  production traffic.
- Consider adding basic rate limiting per session/IP so the endpoint
  can't be abused to run up your API bill.

## Notes on cost

Pricing is pay-per-token and depends on the model you pick in
`server.js` (`MODEL` constant). Check current rates at
https://claude.com/pricing before going live — for a simple Q&A
widget, a smaller/faster model is usually plenty and keeps costs low.
