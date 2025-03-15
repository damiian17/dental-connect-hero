
// src/components/chat/useChatAssistant.ts
import { useState, useEffect, useRef, useCallback } from 'react';
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

  // Load thread ID from localStorage on component mount
  useEffect(() => {
    const savedThreadId = localStorage.getItem('chatThreadId');
    if (savedThreadId) {
      setThreadId(savedThreadId);
      console.log('Loaded threadId from localStorage:', savedThreadId);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to handle sending messages (with debounce and retry)
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    const callAssistant = async (retryCount = 0) => {
      try {
        console.log('Sending message to assistant:', { message: userMessage, threadId });
        
        // Call the Supabase Edge Function
        const response = await fetch('https://ewxgsseelkjyxkfxbsqu.supabase.co/functions/v1/chat-assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: userMessage, 
            threadId 
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Response not OK:', response.status, errorData);
          throw new Error(`Error: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();
        console.log('Received response from edge function:', data);

        if (!data) {
          throw new Error('No data received from assistant');
        }

        // Store the thread ID for future messages
        if (data.threadId) {
          setThreadId(data.threadId);
          localStorage.setItem('chatThreadId', data.threadId);
          console.log('Saved new threadId:', data.threadId);
        }

        // Add the assistant's response to the messages
        setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error communicating with assistant (attempt ${retryCount + 1}):`, error);
        
        // Retry logic for transient errors
        if (retryCount < 2) {
          toast({
            title: 'Reintentando conexión',
            description: 'Hubo un problema. Reintentando...',
            variant: 'default',
          });
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          return callAssistant(retryCount + 1);
        }
        
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde." 
        }]);
        setIsLoading(false);

        toast({
          title: 'Error de conexión',
          description: `No se pudo conectar con el asistente: ${error.message}`,
          variant: 'destructive',
        });
      }
    };

    callAssistant();
  }, [inputValue, isLoading, threadId, toast]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Function to reset the conversation
  const resetConversation = useCallback(() => {
    // Reset the state
    setMessages([
      { type: 'bot', content: '¡Hola! Soy Carla, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
    ]);
    setThreadId(null);
    
    // Clear localStorage
    localStorage.removeItem('chatThreadId');
    
    toast({
      title: 'Conversación reiniciada',
      description: 'Se ha iniciado una nueva conversación.',
      variant: 'default',
    });
  }, [toast]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
    resetConversation
  };
};
