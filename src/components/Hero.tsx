import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Clipboard, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const installCommand = "curl pan.sh | sh";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand)
      .then(() => {
        setCopied(true);
        toast.success("Command copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy. Please try again.");
      });
  };

  const handleVersionClick = () => {
    window.open("https://github.com/pancrate/release/releases/tag/v1.0.0", "_blank");
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <button
            type="button"
            onClick={handleVersionClick}
            className="inline-block px-3 py-1 rounded-full bg-terminal-dark border border-terminal-purple text-terminal-purple text-sm font-medium mb-6 transition hover:bg-terminal-purple/10 focus:outline-none focus:ring-2 focus:ring-terminal-purple"
            aria-label="View Pancrate v1.2.0 release"
          >
            Pancrate v1.0.0
          </button>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-terminal-green">The</span>{' '}
            <span className="bg-gradient-to-r from-terminal-green to-terminal-text bg-clip-text text-transparent">Ultimate</span>{' '}
            <span className="text-terminal-text">Terminal</span>
            <br />
            <span className="text-terminal-text">Utility Toolkit</span>
          </h1>

          <p className="text-terminal-gray text-lg md:text-xl max-w-2xl mb-8">
            Supercharge your command line with powerful tools, plugins and utilities designed for modern developers.
          </p>

          <div className="w-full max-w-lg mb-12">
            <div className="terminal-header">
              <div className="terminal-circle bg-red-500"></div>
              <div className="terminal-circle bg-yellow-500"></div>
              <div className="terminal-circle bg-green-500"></div>
              <div className="ml-4 text-sm text-terminal-gray"></div>
            </div>
            <div className="flex items-center bg-terminal-dark p-4 rounded-b-md">
              <div className="terminal-prompt">$</div>
              <div className="flex-1 font-mono text-terminal-text">{installCommand}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-terminal-gray hover:text-terminal-green"
                onClick={copyToClipboard}
              >
                {copied ? 
                  <CheckCircle2 className="h-5 w-5 text-terminal-green" /> : 
                  <Clipboard className="h-5 w-5" />
                }
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/80">
              Get Started
            </Button>
            <Button variant="outline" className="border-terminal-purple text-terminal-purple hover:bg-terminal-purple/10">
              Read Docs
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terminal-purple opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-terminal-green opacity-10 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
