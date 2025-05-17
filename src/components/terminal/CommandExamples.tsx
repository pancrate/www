
import React from 'react';
import CommandExampleCard from './CommandExampleCard';

const CommandExamples = () => {
  const commands = [
    { command: 'help', description: 'Show available commands' },
    { command: 'moo', description: 'Easter egg #1' },
    { command: 'pan stats', description: 'Show system stats' },
    { command: 'hacker-mode', description: 'Easter egg #2' },
  ];

  return (
    <div className="bg-terminal-dark rounded-md p-4 mb-8">
      <h3 className="text-xl text-terminal-green mb-4">Try these commands:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commands.map((cmd, index) => (
          <CommandExampleCard 
            key={index}
            command={cmd.command}
            description={cmd.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CommandExamples;
