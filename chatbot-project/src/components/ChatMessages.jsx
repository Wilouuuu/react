import { useEffect ,useRef } from 'react'
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css'

function useAutoScroll(dependencies) {
        const containerRef = useRef(null);

        useEffect(() => {
          const containerElem = containerRef.current;
          if(containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight
          }
        },dependencies);
        return(containerRef)
      }

function ChatMessages({chatMessages}){
  const chatMessagesRef = useAutoScroll(chatMessages);
  
  return(
    <div 
      className="chat-messages-container"
      ref={chatMessagesRef}          
    >
    {chatMessages.length === 0 
      ? <p className="welcome-text"> Welcome to chatbot project! Send a message using the text below.</p>
      : chatMessages.map((chatMessage) => {
        return(
          <ChatMessage 
            message={chatMessage.message} 
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={chatMessage.id} />
        )
      }) 
    }  
  </div>
    )
  }

  export default ChatMessages;