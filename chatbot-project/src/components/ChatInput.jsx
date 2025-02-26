import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({chatMessages,setChatMessages}) {
  const [inputText,setInputText] = useState('');
  //どこでhtmlを特定してる？

  function saveInputText(event){
    setInputText(event.target.value);
    // setでStateを更新、inputを再レンダリングってこと？入力ごとに。
  }

  function sendMessage(){
    const newChatMessages = [
      ...chatMessages,
      {
        message:inputText,
        sender:'user',
        id:crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message:response,
        sender:'robot',
        id:crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange={saveInputText}
        // 入力ごとに関数をrunしてる？
        value={inputText}
        className="chat-input"
      />
      <button 
      onClick={sendMessage}
      className="send-button"
      >Send</button>
    </div>
  ) 
}