const categoryColors = {
  conversational: { accent: '#58a6ff', bg: 'rgba(88,166,255,0.1)' },
  drafting:       { accent: '#79c0ff', bg: 'rgba(121,192,255,0.1)' },
  'image-gen':    { accent: '#f0883e', bg: 'rgba(240,136,62,0.1)' },
  'image-editor': { accent: '#ffa657', bg: 'rgba(255,166,87,0.1)' },
  'video-gen':    { accent: '#39c5cf', bg: 'rgba(57,197,207,0.1)' },
  'video-editor': { accent: '#56d4dd', bg: 'rgba(86,212,221,0.1)' },
  storyboard:     { accent: '#e3b341', bg: 'rgba(227,179,65,0.1)' },
  audio:          { accent: '#a371f7', bg: 'rgba(163,113,247,0.1)' },
  code:           { accent: '#3fb950', bg: 'rgba(63,185,80,0.1)' },
  supercomputer:  { accent: '#ff2d78', bg: 'rgba(255,45,120,0.1)' },
  niche:          { accent: '#d29922', bg: 'rgba(210,153,34,0.1)' },
  notai:          { accent: '#8b949e', bg: 'rgba(139,148,158,0.1)' },
  voice:          { accent: '#ff9bce', bg: 'rgba(255,155,206,0.1)' },
  local:          { accent: '#f85149', bg: 'rgba(248,81,73,0.1)' },
  architectural:  { accent: '#7ee787', bg: 'rgba(126,231,135,0.1)' },
  aggregator:     { accent: '#ffcc66', bg: 'rgba(255,204,102,0.1)' }
};

const categoryLabels = {
  'image-gen': 'Image Gen',
  'image-editor': 'Image Editor',
  'video-gen': 'Video Gen',
  'video-editor': 'Video Editor',
  conversational: 'Conversational',
  drafting: 'Drafting',
  storyboard: 'Storyboard',
  code: 'Coding',
  niche: 'Niche AI',
  supercomputer: 'Supercomputer',
  notai: 'Not AI',
  voice: 'Voice AI',
  local: 'Local AI',
  architectural: 'Architectural AI',
  aggregator: 'AI Aggregator'
};

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatTraffic(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
  if (n >= 1000) return Math.round(n / 1000) + 'K';
  return String(n);
}

function formatTrafficHTML(n) {
  const value = formatTraffic(n);
  if (value === '—') return value;
  return `<span class="card-traffic-label">DAILY TRAFFIC </span><span class="card-traffic-value">${value}</span>`;
}
