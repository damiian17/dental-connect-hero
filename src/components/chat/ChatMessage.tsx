
import { ChatMessage as ChatMessageType } from './types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "rounded-lg p-3 mb-4 max-w-[80%]",
        message.type === 'bot' 
          ? "bg-dental-primary/10" 
          : "bg-gray-100 ml-auto"
      )}
    >
      <p className="text-sm">{message.content}</p>
    </div>
  );
};
