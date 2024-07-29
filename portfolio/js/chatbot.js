
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value;
    if (message.trim() !== '') {
      const messagesContainer = document.getElementById('chatbot-messages');
      const userMessage = document.createElement('div');
      userMessage.classList.add('chatbot-message', 'user-message');
      userMessage.innerText = message;
      messagesContainer.appendChild(userMessage);
      input.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      console.log("chatbot before connecting to backend");
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
        const botMessage = document.createElement('div');
        botMessage.classList.add('chatbot-message', 'bot-message');
        botMessage.innerText = data.message;
        messagesContainer.appendChild(botMessage);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }


