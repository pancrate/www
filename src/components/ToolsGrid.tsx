
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const tools = [
  {
    id: 1,
    name: "fs",
    description: "Enhanced file system operations with intuitive syntax",
    usage: "$ pan fs watch ./src",
    category: "system",
  },
  {
    id: 2,
    name: "http",
    description: "Fast HTTP request testing and API interaction tool",
    usage: "$ pan http get api.example.com/users",
    category: "network",
  },
  {
    id: 3,
    name: "docker",
    description: "Docker container management made simple",
    usage: "$ pan docker list --all",
    category: "container",
  },
  {
    id: 4,
    name: "git",
    description: "Git workflow enhancements and shortcuts",
    usage: "$ pan git sync",
    category: "dev",
  },
  {
    id: 5,
    name: "deploy",
    description: "One-command deployment to various platforms",
    usage: "$ pan deploy --target=production",
    category: "deploy",
  },
  {
    id: 6,
    name: "stats",
    description: "System resource monitoring with beautiful visuals",
    usage: "$ pan stats --live",
    category: "system",
  },
];

const categories = ["all", "system", "network", "container", "dev", "deploy"];

const ToolsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <section id="tools" className="section pt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Browse Tools</h2>
        <p className="text-terminal-gray text-center mb-12">Discover powerful utilities to boost your terminal productivity</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-terminal-gray" />
            </div>
            <input
              type="text"
              className="w-full pl-10 py-2 bg-terminal-dark border border-terminal-gray/20 rounded-md text-terminal-text focus:ring-2 focus:ring-terminal-green focus:outline-none"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={
                  activeCategory === category 
                    ? "bg-terminal-green text-terminal-dark hover:bg-terminal-green/90" 
                    : "border-terminal-gray/30 text-terminal-gray hover:text-terminal-text"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <div key={tool.id} className="tool-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-terminal-green">{tool.name}</h3>
                  <span className="text-xs bg-terminal-bg px-2 py-1 rounded-full text-terminal-gray">
                    {tool.category}
                  </span>
                </div>
                <p className="text-terminal-text mb-4">{tool.description}</p>
                <div className="font-mono text-sm bg-black bg-opacity-30 p-2 rounded text-terminal-gray">
                  {tool.usage}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-terminal-gray">
              No tools found matching your criteria
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-terminal-purple text-white hover:bg-terminal-purple/90">
            View All Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
