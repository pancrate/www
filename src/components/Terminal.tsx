
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import TerminalInstance from './terminal/TerminalInstance';
import FallbackTerminal from './terminal/FallbackTerminal';
import TerminalHeader from './terminal/TerminalHeader';
import CommandExamples from './terminal/CommandExamples';
import '../styles/xterm.css';

const Terminal = () => {
  const [isXtermLoaded, setIsXtermLoaded] = useState(false);
  
  return (
    <section id="terminal" className="section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Interactive Terminal</h2>
        <p className="text-terminal-gray text-center mb-12">
          Try out Pancrate commands directly in your browser
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 terminal">
            <TerminalHeader />
            <div className="h-96 w-full">
              {isXtermLoaded ? null : <FallbackTerminal />}
              <TerminalInstance onLoadStateChange={setIsXtermLoaded} />
            </div>
          </div>
          
          <CommandExamples />
          
          <div className="text-center">
            <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90">
              Install Pancrate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
