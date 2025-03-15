
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from './types';

export const useChatAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', content: '¡Hola! Soy Carla, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending message to assistant:', { message: userMessage, threadId });
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { message: userMessage, threadId }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('No data received from assistant');
      }

      console.log('Received response:', data);

      // Store the thread ID for future messages
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      // Add the assistant's response to the messages
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error communicating with assistant:', error);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde." 
        }]);
        setIsLoading(false);
      }, 500);

      toast({
        title: 'Error de conexión',
        description: 'No se pudo conectar con el asistente. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress
  };
};
