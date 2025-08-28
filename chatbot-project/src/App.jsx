import { useState , useEffect } from 'react';
import './App.css';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { chatbot } from 'supersimpledev';


function App() {
  const [chatMessages ,setChatMessages] = useState(JSON.parse(localStorage.getItem('messages'))|| []);
  
  useEffect(() => {
    chatbot.addResponses({
      'wech za3im': 'wech les hommes ay mli7a' ,
      'fuck you' : 'man fuck you and yo mama' ,
    },
    localStorage.setItem('messages' , JSON.stringify(chatMessages))
    )
  },chatMessages)
  
  return(
  <div className="app-container">
    <ChatMessages
    chatMessages = {chatMessages}
    />  
    <ChatInput 
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
  </div>
  );
  

} 

export default App
