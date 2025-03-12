
import { useState } from 'react';
import { MessageSquare, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChatButtonProps } from './types';
import { ChatMessage } from './ChatMessage';
import { ChatLoading } from './ChatLoading';
import { ChatInput } from './ChatInput';
import { useChatAssistant } from './useChatAssistant';

export const ChatButton = ({ className }: ChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress
  } = useChatAssistant();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="bg-dental-primary p-4 text-white flex items-center gap-2">
            <Bot size={24} />
            <div>
              <h3 className="font-medium">Carla</h3>
              <p className="text-xs text-white/80">Asistente Virtual</p>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors ml-auto"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4 bg-gray-50 h-72 overflow-y-auto">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {isLoading && <ChatLoading />}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
      
      <Button
        onClick={toggleChat}
        className={cn(
          "rounded-full w-14 h-14 flex items-center justify-center shadow-lg",
          isOpen ? "bg-gray-700" : "bg-dental-primary",
          isOpen ? "hover:bg-gray-600" : "hover:bg-dental-primary/90"
        )}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </Button>
    </div>
  );
};
