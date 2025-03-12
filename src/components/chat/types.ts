
export interface ChatMessage {
  type: 'bot' | 'user';
  content: string;
}

export interface ChatButtonProps {
  className?: string;
}

export interface PredefinedQA {
  [key: string]: string;
}
