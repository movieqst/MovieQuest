// Parses the raw text into an array of { question, keywords, responses }
function parseHalData(rawText) {
  const entries = [];
  // Split on lines that start with a number followed by a period (question headers)
  const blocks = rawText.split(/\n(?=\d+\.\s)/).map(b => b.trim()).filter(Boolean);

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const questionMatch = lines[0].match(/^\d+\.\s*(.+)$/);
    if (!questionMatch) continue;

    const question = questionMatch[1];
    const responses = [];

    for (let i = 1; i < lines.length; i++) {
      const respMatch = lines[i].match(/^[ABC]:\s*(.+)$/);
      if (respMatch) responses.push(respMatch[1]);
    }

    if (responses.length > 0) {
      entries.push({
        question,
        keywords: extractKeywords(question),
        responses
      });
    }
  }
  return entries;
}

// Pull out meaningful words from a question, ignoring common filler words
const STOPWORDS = new Set(["what","is","are","do","does","you","your","the","a","an",
  "of","to","in","on","for","and","or","can","could","would","will","have","has",
  "did","was","were","it","this","that","i","me","my"]);

function extractKeywords(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

// Build the database once, at load time
const HAL_DATABASE = parseHalData(HAL_RAW_DATA);

// Given user input, score every entry by keyword overlap and return the best match
function findBestMatch(userText) {
  const userKeywords = extractKeywords(userText);
  if (userKeywords.length === 0) return null;

  let bestEntry = null;
  let bestScore = 0;

  for (const entry of HAL_DATABASE) {
    let score = 0;
    for (const kw of userKeywords) {
      if (entry.keywords.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // Require at least one real keyword match to avoid random nonsense answers
  return bestScore > 0 ? bestEntry : null;
}

// Public function your chat UI calls
function getAIResponse(userText) {
  const match = findBestMatch(userText);

  if (match) {
    const list = match.responses;
    return list[Math.floor(Math.random() * list.length)];
  }

  // Fallback if nothing in the 1000 questions matches well
  const fallback = [
    "That is an interesting question. I do not have a precise answer for it.",
    "I am processing that, but I require more specific input.",
    "Curious. Could you rephrase that?",
    "I am not certain I follow. Please, continue."
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}
