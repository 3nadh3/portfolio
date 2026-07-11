// Portfolio chatbot — v2
// Adds: animated typing indicator, duplicate-send guard,
// cold-start notice for the free-tier backend, and input refocus.

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chat-button');
  const messagesContainer = document.getElementById('chatbot-messages');
  const message = input.value.trim();

  if (!message || input.disabled) return;

  // User message
  const userMessage = document.createElement('div');
  userMessage.classList.add('chatbot-message', 'user-message');
  userMessage.innerText = message;
  messagesContainer.appendChild(userMessage);

  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Animated typing indicator (three bouncing dots)
  const loadingMessage = document.createElement('div');
  loadingMessage.classList.add('chatbot-message', 'bot-message', 'loading');
  loadingMessage.setAttribute('role', 'status');
  loadingMessage.setAttribute('aria-label', 'Assistant is typing');
  loadingMessage.innerHTML =
    '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  messagesContainer.appendChild(loadingMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Block duplicate sends while a reply is pending
  input.disabled = true;
  sendBtn.disabled = true;

  // The backend runs on a free tier and cold-starts after inactivity.
  // If the reply is slow, tell the visitor instead of leaving them guessing.
  const slowTimer = setTimeout(() => {
    if (loadingMessage.isConnected) {
      const note = document.createElement('div');
      note.classList.add('typing-note');
      note.innerText = 'Waking up the assistant — this first reply can take a moment…';
      loadingMessage.appendChild(note);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, 6000);

  const finish = () => {
    clearTimeout(slowTimer);
    if (loadingMessage.isConnected) messagesContainer.removeChild(loadingMessage);
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  };

  fetch('https://portfolio-chatbot-ozkz.onrender.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: message }),
  })
    .then((response) => response.json())
    .then((data) => {
      finish();
      const botMessage = document.createElement('div');
      botMessage.classList.add('chatbot-message', 'bot-message');
      botMessage.innerText = data.message;
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch((error) => {
      console.error('Error:', error);
      finish();
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('chatbot-message', 'bot-message');
      errorMessage.innerText = 'Something went wrong. Please try again.';
      messagesContainer.appendChild(errorMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}
