
import React from 'react';

interface CommandExampleProps {
  command: string;
  description: string;
}

const CommandExampleCard: React.FC<CommandExampleProps> = ({ command, description }) => {
  return (
    <div className="flex items-center">
      <div className="bg-terminal-bg p-2 rounded mr-3">
        <span className="font-mono text-terminal-green">{command}</span>
      </div>
      <span className="text-terminal-text">{description}</span>
    </div>
  );
};

export default CommandExampleCard;
