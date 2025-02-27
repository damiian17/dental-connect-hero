
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  className?: string;
}

const ChatButton = ({ className }: ChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="bg-dental-primary p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">Chatea con nosotros</h3>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4 bg-gray-50 h-72 overflow-y-auto">
            <div className="bg-dental-primary/10 rounded-lg p-3 mb-4 max-w-[80%]">
              <p className="text-sm">¡Hola! ¿En qué podemos ayudarte hoy?</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 mb-4 max-w-[80%] ml-auto">
              <p className="text-sm">Estoy buscando un dentista cerca de mi zona.</p>
            </div>
            <div className="bg-dental-primary/10 rounded-lg p-3 mb-4 max-w-[80%]">
              <p className="text-sm">Perfecto, ¿podrías indicarnos tu código postal o ciudad?</p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Escribe tu mensaje..." 
              className="input-field text-sm flex-1 py-2" 
            />
            <Button size="sm" className="py-2">Enviar</Button>
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
