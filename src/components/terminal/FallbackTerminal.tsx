
import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";

interface FallbackTerminalProps {
  className?: string;
}

const FallbackTerminal: React.FC<FallbackTerminalProps> = ({ className }) => {
  const [input, setInput] = useState('');
  
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-circle bg-red-500"></div>
        <div className="terminal-circle bg-yellow-500"></div>
        <div className="terminal-circle bg-green-500"></div>
        <span className="ml-4 text-terminal-gray text-sm">Pancrate Terminal</span>
      </div>
      <div className="terminal-content p-4 font-mono bg-terminal-dark text-terminal-text">
        <div>
          <div className="text-terminal-purple mb-2">
            Pancrate Terminal Utility Toolkit v1.2.0
          </div>
          <div className="mb-4">
            Welcome to the Pancrate interactive terminal!<br/>
            Type <span className="text-terminal-green">help</span> to see available commands.
          </div>
          <div className="flex">
            <span className="text-terminal-green mr-2">$</span>
            <input
              className="command-input bg-transparent border-none outline-none text-terminal-text font-mono flex-1"
              type="text"
              placeholder="Type a command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  toast.success(`Command '${input}' recognized. Try the live demo!`);
                  setInput('');
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackTerminal;
