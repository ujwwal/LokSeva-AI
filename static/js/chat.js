// Chat functionality
class ChatApp {
    constructor() {
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        this.chatMessages = document.getElementById('chat-messages');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.quickActionButtons = document.querySelectorAll('.quick-action');
        
        this.init();
    }
    
    init() {
        // Set initial timestamp
        document.getElementById('initial-time').textContent = this.getCurrentTime();
        
        // Event listeners
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });
        
        // Quick action buttons
        this.quickActionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message');
                this.messageInput.value = message;
                this.handleSendMessage();
            });
        });
        
        // Update send button state
        this.messageInput.addEventListener('input', () => {
            this.updateSendButtonState();
        });
        
        this.updateSendButtonState();
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    updateSendButtonState() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText;
    }
    
    async handleSendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, false);
        
        // Clear input
        this.messageInput.value = '';
        this.updateSendButtonState();
        
        // Show loading indicator
        this.showLoading(true);
        
        try {
            // Send message to backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Add bot response to chat
            this.addMessage(data.response, true);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', true);
        } finally {
            this.showLoading(false);
        }
    }
    
addMessage(text, isBot) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex w-full items-start ${isBot ? 'justify-start space-x-3' : 'justify-end space-x-3'}`;
        
    const avatarDiv = document.createElement('div');
    avatarDiv.className = `flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isBot 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
            : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
    }`;
    
    const avatarSvg = document.createElement('svg');
    avatarSvg.className = 'w-5 h-5';
    avatarSvg.setAttribute('fill', 'none');
    avatarSvg.setAttribute('stroke', 'currentColor');
    avatarSvg.setAttribute('viewBox', '0 0 24 24');
    
    if (isBot) {
        avatarSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />';
    } else {
        avatarSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />';
    }
    
    avatarDiv.appendChild(avatarSvg);
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
        isBot
            ? 'ai-message-bubble bg-white border border-gray-200 text-gray-800 rounded-tl-md'
            : 'user-message-bubble bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-md'
    }`;
    
    const textContainer = document.createElement('div');
    textContainer.className = isBot ? 'ai-response' : '';
    
    if (isBot) {
        let processedText = text
            .replace(/^###\s+(.*?)$/gm, '<h3>$1</h3>')
            .replace(/^##\s+(.*?)$/gm, '<h2>$1</h2>')
            .replace(/^#\s+(.*?)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/^(?:- |\* )(.*?)$/gm, '<li>$1</li>')
            .replace(/(<li>.*?<\/li>)(?:\n|$)+(?=<li>)/g, '$1')
            .replace(/\n{2,}/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        if (!processedText.startsWith('<h') && !processedText.startsWith('<p>')) {
            processedText = '<p>' + processedText;
        }
        if (!processedText.endsWith('</p>') && !processedText.endsWith('</li>')) {
            processedText += '</p>';
        }
        
        processedText = processedText.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
        
        textContainer.innerHTML = processedText;
    } else {
        const textP = document.createElement('p');
        textP.className = 'text-sm leading-relaxed text-white';
        textP.textContent = text;
        textContainer.appendChild(textP);
    }
    
    const timeDiv = document.createElement('div');
    timeDiv.className = `text-xs mt-2 ${isBot ? 'text-gray-500' : 'text-blue-100'}`;
    timeDiv.textContent = this.getCurrentTime();
    
    bubbleDiv.appendChild(textContainer);
    bubbleDiv.appendChild(timeDiv);
    
    // Order depends on side
    if (isBot) {
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(bubbleDiv);
    } else {
        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(avatarDiv);
    }
    
    this.chatMessages.appendChild(messageDiv);
    
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
}

    showLoading(show) {
        if (show) {
            this.loadingIndicator.classList.remove('hidden');
        } else {
            this.loadingIndicator.classList.add('hidden');
        }
    }
}

// Initialize the chat app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});