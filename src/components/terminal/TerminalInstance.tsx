
import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import '../../styles/xterm.css';
import { processCommand } from './terminalUtils';

interface TerminalInstanceProps {
  onLoadStateChange: (loaded: boolean) => void;
}

const TerminalInstance: React.FC<TerminalInstanceProps> = ({ onLoadStateChange }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a dynamic import to avoid SSR issues
    const initializeXterm = async () => {
      try {
        // Only try to load xterm if we're in a browser environment
        if (typeof window !== 'undefined') {
          // Import dynamically - fixed to use full package path
          const xtermModule = await import('xterm');
          const xtermFitModule = await import('xterm-addon-fit');
          
          // Create and initialize terminal
          const term = new xtermModule.Terminal({
            cursorBlink: true,
            theme: {
              background: '#121418',
              foreground: '#F9FAFB',
              cursor: '#0FE47A',
              cursorAccent: '#1A1F2C',
              black: '#121418',
              red: '#E06C75',
              green: '#0FE47A',
              yellow: '#E5C07B',
              blue: '#61AFEF',
              magenta: '#9B87F5',
              cyan: '#56B6C2',
              white: '#F9FAFB',
              brightBlack: '#5C6370',
              brightRed: '#E06C75',
              brightGreen: '#0FE47A',
              brightYellow: '#E5C07B',
              brightBlue: '#61AFEF',
              brightMagenta: '#9B87F5',
              brightCyan: '#56B6C2',
              brightWhite: '#FFFFFF'
            },
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            lineHeight: 1.2,
          });
          
          // Add the fit addon which helps the terminal auto-resize
          const fitAddon = new xtermFitModule.FitAddon();
          term.loadAddon(fitAddon);
          
          // If we have a DOM node to attach to
          if (terminalRef.current) {
            term.open(terminalRef.current);
            fitAddon.fit();
            
            // Write welcome message
            term.writeln('\x1b[1;36m  ____                           _       \x1b[0m');
            term.writeln('\x1b[1;36m |  _ \\ __ _ _ __   ___ _ __ __ _| |_ ___ \x1b[0m');
            term.writeln('\x1b[1;36m | |_) / _` | \'_ \\ / __| \'__/ _` | __/ _ \\\x1b[0m');
            term.writeln('\x1b[1;36m |  __/ (_| | | | | (__| | | (_| | ||  __/\x1b[0m');
            term.writeln('\x1b[1;36m |_|   \\__,_|_| |_|\\___|_|  \\__,_|\\__\\___|\x1b[0m');
            term.writeln('\x1b[1;32m1.2.0\x1b[0m');
            term.writeln('');
            term.writeln('Welcome to the Pancrate interactive terminal!');
            term.writeln('Type \x1b[1;32mhelp\x1b[0m to see available commands.');
            term.writeln('');
            term.write('\x1b[1;32m$ \x1b[0m');
            
            // Track input state
            let inputBuffer = '';
            
            // Handle terminal input
            term.onKey(({ key, domEvent }) => {
              const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
              
              // Handle enter key press
              if (domEvent.keyCode === 13) {
                term.write('\r\n');
                if (inputBuffer.trim()) {
                  const result = processCommand(term, inputBuffer);
                  inputBuffer = '';
                }
                term.write('\x1b[1;32m$ \x1b[0m');
              }
              // Handle backspace
              else if (domEvent.keyCode === 8) {
                // Do not delete the prompt
                if (inputBuffer.length > 0) {
                  term.write('\b \b');
                  inputBuffer = inputBuffer.slice(0, -1);
                }
              }
              // Add printable characters to the input
              else if (printable) {
                term.write(key);
                inputBuffer += key;
              }
            });
            
            onLoadStateChange(true);
            
            // Handle terminal resizing
            window.addEventListener('resize', () => {
              fitAddon.fit();
            });
            
            // Return cleanup function
            return () => {
              term.dispose();
              window.removeEventListener('resize', () => {
                fitAddon.fit();
              });
            };
          }
        }
      } catch (error) {
        console.error("Failed to load xterm.js:", error);
        onLoadStateChange(false);
      }
    };
    
    initializeXterm();
    
  }, [onLoadStateChange]);
  
  return <div ref={terminalRef} className="h-96 w-full" />;
};

export default TerminalInstance;
