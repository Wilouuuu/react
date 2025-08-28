import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinner from '../assets/loading-spinner.gif'
import './chatInput.css'
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages, }){
        const [inputText, setInputText] = useState('');
        const [isLoading, setisLoading] = useState(false);
       
        function ClearMessage (){
          localStorage.clear();
          setChatMessages([]);
        }
       
        function saveInputText(event){
          setInputText(event.target.value);
        }

        async function sendMessge(){

         if (isLoading === false && inputText) {
          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ];
          
          setisLoading(true)

          setChatMessages([
            ...newChatMessages,
            {
              message: <img className="loading-image" src={LoadingSpinner} />,
              sender: 'robot',
              id: crypto.randomUUID(),
              time: null
            }
          ]);

          setInputText('');
          
          const Response = await Chatbot.getResponseAsync(inputText);

            setChatMessages([
            ...newChatMessages,
            {
              
              message: Response,
              sender: 'robot',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ]);
         } 
         setisLoading(false)  
        }

        function HandleKeyDown(event){
          if(event.key === 'Enter')
          sendMessge();
          if (event.key === 'Escape') {
            setInputText('');
          }
        }

        return (
        <div className="chat-input-container">
          <input 
            onKeyDown = {HandleKeyDown} 
            placeholder = "Send a message to chatbot" 
            size="30"
            onChange={saveInputText}
            value = {inputText}
            className="chat-input"
          />
          <button
          onClick={sendMessge}
          className="send-button"
          >Send</button>
          <button
            onClick={ClearMessage}
            className="clear-button"
          >Clear</button>
        </div>
        );
      }