// widget.js
// Drop this on any page:  <script src="widget.js" defer></script>
// Adjust BACKEND_URL to point at wherever server.js is deployed.

(function () {
  const BACKEND_URL = 'http://localhost:3000/api/chat'; // change for production

  const sessionId = 'sess_' + Math.random().toString(36).slice(2);

  const style = document.createElement('style');
  style.textContent = `
    .cw-launcher {
      position: fixed; bottom: 24px; right: 24px; z-index: 999999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #1a1a1a; color: #fff; border: none; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; transition: transform 0.15s ease;
    }
    .cw-launcher:hover { transform: scale(1.06); }
    .cw-window {
      position: fixed; bottom: 96px; right: 24px; z-index: 999999;
      width: 360px; max-width: calc(100vw - 32px);
      height: 500px; max-height: calc(100vh - 140px);
      background: #fff; border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.2);
      display: none; flex-direction: column; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .cw-window.open { display: flex; }
    .cw-header {
      background: #1a1a1a; color: #fff; padding: 14px 16px;
      font-weight: 600; font-size: 15px; display: flex;
      justify-content: space-between; align-items: center;
    }
    .cw-close { cursor: pointer; opacity: 0.7; font-size: 18px; background: none; border: none; color: #fff; }
    .cw-close:hover { opacity: 1; }
    .cw-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 10px; background: #fafafa;
    }
    .cw-msg { max-width: 82%; padding: 9px 13px; border-radius: 14px; font-size: 14px; line-height: 1.4; white-space: pre-wrap; }
    .cw-msg.user { align-self: flex-end; background: #1a1a1a; color: #fff; border-bottom-right-radius: 4px; }
    .cw-msg.bot { align-self: flex-start; background: #ececec; color: #1a1a1a; border-bottom-left-radius: 4px; }
    .cw-msg.typing { align-self: flex-start; color: #999; font-style: italic; }
    .cw-inputbar {
      display: flex; border-top: 1px solid #eee; padding: 10px; gap: 8px;
    }
    .cw-input {
      flex: 1; border: 1px solid #ddd; border-radius: 20px; padding: 9px 14px;
      font-size: 14px; outline: none;
    }
    .cw-input:focus { border-color: #1a1a1a; }
    .cw-send {
      background: #1a1a1a; color: #fff; border: none; border-radius: 20px;
      padding: 0 16px; font-size: 14px; cursor: pointer;
    }
    .cw-send:disabled { opacity: 0.5; cursor: default; }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.className = 'cw-launcher';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.textContent = '💬';

  const win = document.createElement('div');
  win.className = 'cw-window';
  win.innerHTML = `
    <div class="cw-header">
      <span>Ask us anything</span>
      <button class="cw-close" aria-label="Close chat">✕</button>
    </div>
    <div class="cw-messages"></div>
    <div class="cw-inputbar">
      <input class="cw-input" type="text" placeholder="Type a question..." />
      <button class="cw-send">Send</button>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(win);

  const messagesEl = win.querySelector('.cw-messages');
  const inputEl = win.querySelector('.cw-input');
  const sendBtn = win.querySelector('.cw-send');
  const closeBtn = win.querySelector('.cw-close');

  function addMessage(text, who) {
    const el = document.createElement('div');
    el.className = 'cw-msg ' + who;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  let opened = false;
  launcher.addEventListener('click', () => {
    opened = !opened;
    win.classList.toggle('open', opened);
    if (opened && messagesEl.children.length === 0) {
      addMessage("Hi! Ask me anything about this site — or anything else.", 'bot');
    }
  });
  closeBtn.addEventListener('click', () => {
    opened = false;
    win.classList.remove('open');
  });

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    sendBtn.disabled = true;
    addMessage(text, 'user');
    const typingEl = addMessage('Thinking...', 'typing');

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      typingEl.remove();
      if (data.reply) {
        addMessage(data.reply, 'bot');
      } else {
        addMessage("Sorry, something went wrong. Please try again.", 'bot');
      }
    } catch (e) {
      typingEl.remove();
      addMessage("Sorry, I couldn't reach the server. Please try again.", 'bot');
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
