

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value;

  if (message.trim() !== '') {
    const messagesContainer = document.getElementById('chatbot-messages');

    // User message
    const userMessage = document.createElement('div');
    userMessage.classList.add('chatbot-message', 'user-message');
    userMessage.innerText = message;
    messagesContainer.appendChild(userMessage);

    // Clear input
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Loading indicator
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('chatbot-message', 'bot-message', 'loading');
    loadingMessage.innerText = '...';
    messagesContainer.appendChild(loadingMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    console.log("chatbot before connecting to backend");
    //api_route = process.env.API_ROUTE;
    // Send message to backend
    fetch('https://portfolio-chatbot-ozkz.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message }),
    })
    .then(response => response.json())
    .then(data => {
      // Remove loading indicator
      messagesContainer.removeChild(loadingMessage);

      // Bot message
      const botMessage = document.createElement('div');
      botMessage.classList.add('chatbot-message', 'bot-message');
      botMessage.innerText = data.message;
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
      console.error('Error:', error);

      // Remove loading indicator
      messagesContainer.removeChild(loadingMessage);

      // Error message
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('chatbot-message', 'bot-message');
      errorMessage.innerText = 'Something went wrong. Please try again.';
      messagesContainer.appendChild(errorMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }
}
