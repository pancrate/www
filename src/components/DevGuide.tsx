
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const DevGuide = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        toast.success("Code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy. Please try again.");
      });
  };
  
  const sampleToolCode = `#!/usr/bin/env bash

# Define metadata for your tool
TOOL_NAME="hello-world"
TOOL_VERSION="1.0.0"
TOOL_DESCRIPTION="A simple hello world tool example"
TOOL_AUTHOR="Your Name"

# Define command help
function show_help {
  echo "Usage: pan hello-world [OPTIONS]"
  echo ""
  echo "A simple hello world tool example"
  echo ""
  echo "Options:"
  echo "  --name, -n NAME    Name to greet (default: World)"
  echo "  --help, -h         Show this help message"
  echo "  --version, -v      Show version information"
}

# Parse arguments
NAME="World"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --name|-n)
      NAME="$2"
      shift 2
      ;;
    --help|-h)
      show_help
      exit 0
      ;;
    --version|-v)
      echo "$TOOL_NAME v$TOOL_VERSION"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Main function
function main {
  echo "✨ Hello, $NAME! Welcome to Pancrate! ✨"
}

main
`;

  return (
    <section id="develop" className="section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Add Your Own Tool</h2>
        <p className="text-terminal-gray text-center mb-12">
          Extend Pancrate with your own custom tools and utilities
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - explanation */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 text-terminal-green">Build the tools you need</h3>
            <p className="text-terminal-text mb-6">
              Pancrate is designed to be extended with custom tools. Whether you're building internal 
              utilities for your team or contributing to the community, creating a tool is simple:
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="mr-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-terminal-green text-terminal-dark font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-terminal-text">Create your script</h4>
                  <p className="text-terminal-gray">
                    Write your tool in any language you prefer. Use our helper libraries for common tasks.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-terminal-green text-terminal-dark font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-terminal-text">Add metadata</h4>
                  <p className="text-terminal-gray">
                    Include name, description, version and help information in your script.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-terminal-green text-terminal-dark font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-terminal-text">Install locally</h4>
                  <p className="text-terminal-gray">
                    Use <code className="text-terminal-purple">pan tool install ./my-tool</code> to install it.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-terminal-green text-terminal-dark font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-terminal-text">Share with others</h4>
                  <p className="text-terminal-gray">
                    Publish to our registry to share with the community: <code className="text-terminal-purple">pan publish</code>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90">
                Read Documentation
              </Button>
            </div>
          </div>
          
          {/* Right column - code sample */}
          <div className="flex-1">
            <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-terminal-bg border border-terminal-gray/20 mb-4">
                <TabsTrigger 
                  value="overview" 
                  className={activeTab === "overview" ? "text-terminal-green" : ""}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="code" 
                  className={activeTab === "code" ? "text-terminal-green" : ""}
                >
                  Sample Code
                </TabsTrigger>
                <TabsTrigger 
                  value="install" 
                  className={activeTab === "install" ? "text-terminal-green" : ""}
                >
                  Installation
                </TabsTrigger>
              </TabsList>
              
              <Card className="bg-terminal-dark border-terminal-gray/20">
                <CardContent className="p-0">
                  <TabsContent value="overview" className="m-0">
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-terminal-text mb-4">Tool Structure</h4>
                      <p className="text-terminal-gray mb-4">
                        Pancrate tools follow a simple structure to ensure compatibility and discoverability:
                      </p>
                      
                      <ul className="list-disc text-terminal-gray space-y-2 pl-5 mb-4">
                        <li>Each tool is a single executable file</li>
                        <li>Tools include metadata for the registry</li>
                        <li>Help documentation is required</li>
                        <li>Consistent command line argument parsing</li>
                        <li>Error handling and exit codes follow standards</li>
                      </ul>
                      
                      <p className="text-terminal-text">
                        Tools can be written in any language, but Bash, Python, and JavaScript are recommended for maximum compatibility.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="m-0">
                    <div className="relative">
                      <pre className="language-bash overflow-x-auto text-sm p-6 text-terminal-text">
                        <code>{sampleToolCode}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 text-terminal-gray hover:text-terminal-green"
                        onClick={() => copyCode(sampleToolCode)}
                      >
                        {copied ? 
                          <CheckCircle2 className="h-5 w-5 text-terminal-green" /> : 
                          <Copy className="h-5 w-5" />
                        }
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="install" className="m-0">
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-terminal-text mb-4">Installing Your Tool</h4>
                      <p className="text-terminal-gray mb-4">
                        Once you've created your tool, here's how to install it:
                      </p>
                      
                      <div className="bg-black bg-opacity-30 p-4 rounded-md mb-4">
                        <code className="text-terminal-green">$ pan tool install ./path/to/your-tool</code>
                      </div>
                      
                      <p className="text-terminal-gray mb-4">
                        To publish your tool to the Pancrate registry:
                      </p>
                      
                      <div className="bg-black bg-opacity-30 p-4 rounded-md mb-4">
                        <code className="text-terminal-green">$ pan publish</code>
                      </div>
                      
                      <p className="text-terminal-gray">
                        Follow the prompts to enter additional metadata and submit your tool for review.
                      </p>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevGuide;
