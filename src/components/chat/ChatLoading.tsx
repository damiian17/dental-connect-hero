
export const ChatLoading = () => {
  return (
    <div className="rounded-lg p-3 mb-4 max-w-[80%] bg-dental-primary/10">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-dental-primary/40 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-dental-primary/40 animate-bounce delay-75"></div>
        <div className="w-2 h-2 rounded-full bg-dental-primary/40 animate-bounce delay-150"></div>
      </div>
    </div>
  );
};
