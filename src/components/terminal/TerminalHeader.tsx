
import React from 'react';

interface TerminalHeaderProps {
  title?: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title = "Pancrate Terminal" }) => {
  return (
    <div className="terminal-header">
      <div className="terminal-circle bg-red-500"></div>
      <div className="terminal-circle bg-yellow-500"></div>
      <div className="terminal-circle bg-green-500"></div>
      <span className="ml-4 text-terminal-gray text-sm">{title}</span>
    </div>
  );
};

export default TerminalHeader;
