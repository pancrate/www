
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed w-full bg-terminal-bg bg-opacity-90 backdrop-blur-md z-50 border-b border-terminal-dark">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <span className="text-terminal-green font-mono text-xl font-bold mr-1">pan</span>
              <span className="text-terminal-text font-mono text-xl">crate</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#tools" className="text-terminal-text hover:text-terminal-green transition-colors duration-200">Tools</a>
            <a href="#status" className="text-terminal-text hover:text-terminal-green transition-colors duration-200">Status</a>
            <a href="#develop" className="text-terminal-text hover:text-terminal-green transition-colors duration-200">Develop</a>
            <a href="#terminal" className="text-terminal-text hover:text-terminal-green transition-colors duration-200">Terminal</a>
            <Button variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-dark">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-terminal-text"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-terminal-dark mt-3 animate-accordion-down">
            <div className="flex flex-col space-y-4">
              <a href="#tools" className="text-terminal-text hover:text-terminal-green transition-colors duration-200 py-2">Tools</a>
              <a href="#status" className="text-terminal-text hover:text-terminal-green transition-colors duration-200 py-2">Status</a>
              <a href="#develop" className="text-terminal-text hover:text-terminal-green transition-colors duration-200 py-2">Develop</a>
              <a href="#terminal" className="text-terminal-text hover:text-terminal-green transition-colors duration-200 py-2">Terminal</a>
              <Button variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-dark">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
