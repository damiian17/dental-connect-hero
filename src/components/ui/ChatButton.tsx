
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, Send } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface ChatButtonProps {
  className?: string;
}

interface Message {
  type: 'bot' | 'user';
  content: string;
}

// Predefined Q&A for fallback
const predefinedQA = {
  "¿Cómo funciona su servicio de centro de llamadas dental?": "Nuestro centro de llamadas dental actúa como un puente entre pacientes y clínicas dentales. Cuando nos llamas, nuestros representantes capacitados recopilan información sobre tus necesidades dentales, ubicación y preferencias. Luego te conectamos con una clínica dental apropiada de nuestra red de socios, ayudándote a asegurar una cita de manera rápida y eficiente.",
  "¿Hay alguna tarifa por usar su servicio?": "No, nuestro servicio es completamente gratuito para los pacientes. Somos compensados por nuestras clínicas dentales asociadas que valoran las referencias de pacientes que proporcionamos. Solo pagarás por los servicios dentales reales que recibas en la clínica.",
  "¿Pueden ayudar con emergencias dentales?": "¡Absolutamente! Priorizamos las emergencias dentales y tenemos clínicas asociadas que ofrecen atención dental de emergencia. Nuestro servicio 24/7 garantiza que puedas obtener ayuda incluso fuera del horario comercial habitual.",
  "¿Trabajan con proveedores de seguros dentales?": "Sí, podemos conectarte con clínicas que acepten tu seguro dental. Cuando llames, solo informa a nuestro representante sobre tu cobertura de seguro, y encontraremos clínicas que estén dentro de la red para tu plan.",
  "¿Qué tan rápido puedo obtener una cita?": "La disponibilidad de citas varía según tus necesidades específicas y las clínicas en tu área. Para chequeos estándar, normalmente podemos organizar citas en unos pocos días. Para emergencias, nos esforzamos por conectarte con una clínica que pueda atenderte el mismo día.",
  "¿Qué pasa si no estoy satisfecho con la clínica dental recomendada?": "Tu satisfacción es nuestra prioridad. Si no estás contento con la clínica que hemos recomendado, háganoslo saber y trabajaremos para encontrar una alternativa que se adapte mejor a tus necesidades. Valoramos tus comentarios ya que nos ayudan a mejorar nuestro servicio."
};

const ChatButton = ({ className }: ChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { message: userMessage, threadId }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('No data received from assistant');
      }

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
      
      // Fallback to predefined answers
      const bestMatch = Object.entries(predefinedQA).reduce((best, [question, answer]) => {
        const similarity = question.toLowerCase().includes(userMessage.toLowerCase()) ||
                          userMessage.toLowerCase().includes(question.toLowerCase());
        return similarity ? [question, answer] : best;
      }, ['', '']);

      if (bestMatch[1]) {
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', content: bestMatch[1] }]);
          setIsLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: "Lo siento, no he entendido tu pregunta. ¿Podrías reformularla o elegir una de las preguntas frecuentes?" 
          }]);
          setIsLoading(false);
        }, 500);
      }

      toast({
        title: 'Error de conexión',
        description: 'Usando respuestas predefinidas como respaldo.',
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
              <div
                key={index}
                className={cn(
                  "rounded-lg p-3 mb-4 max-w-[80%]",
                  message.type === 'bot' 
                    ? "bg-dental-primary/10" 
                    : "bg-gray-100 ml-auto"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="rounded-lg p-3 mb-4 max-w-[80%] bg-dental-primary/10">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-dental-primary/40 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-dental-primary/40 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-dental-primary/40 animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..." 
              className="input-field text-sm flex-1 py-2" 
              disabled={isLoading}
            />
            <Button 
              size="sm" 
              className="py-2"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              {isLoading ? 
                <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div> :
                <Send size={16} />
              }
            </Button>
          </div>
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

export default ChatButton;
