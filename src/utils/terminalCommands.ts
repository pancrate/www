
interface CommandResult {
  output: string;
  isEasterEgg: boolean;
}

const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateASCIICow = () => {
  return `
        ^__^
        (oo)\\_______
        (__)\\       )\\/\\
            ||----w |
            ||     ||
  `;
};

const generateHackerText = () => {
  const hackerPhrases = [
    "Access granted. Entering the mainframe...",
    "Bypassing security protocols...",
    "Decrypting file system...",
    "Injecting code into the kernel...",
    "Exploiting vulnerability CVE-2023-1337...",
    "Installing backdoor...",
    "Rerouting network traffic...",
    "Compiling zero-day exploit...",
    "Scanning for open ports...",
    "Disabling firewall...",
  ];
  
  let output = "\x1b[1;32m=== HACKER MODE ACTIVATED ===\x1b[0m\n\n";
  
  for (let i = 0; i < 10; i++) {
    const randomPhrase = hackerPhrases[Math.floor(Math.random() * hackerPhrases.length)];
    output += `\x1b[1;32m[${Math.floor(Math.random() * 100)}%]\x1b[0m ${randomPhrase}\n`;
  }
  
  output += "\n\x1b[1;32m=== SYSTEM COMPROMISED ===\x1b[0m\n";
  output += "\x1b[5;31mJUST KIDDING! This is just a harmless easter egg.\x1b[0m";
  
  return output;
};

const showSystemStats = () => {
  const cpuUsage = getRandomValue(10, 60);
  const memoryUsage = getRandomValue(40, 80);
  const diskUsage = getRandomValue(30, 90);
  
  return `
\x1b[1;36m=== SYSTEM STATISTICS ===\x1b[0m

\x1b[1;33mCPU Usage:\x1b[0m ${cpuUsage}%
${'█'.repeat(Math.floor(cpuUsage / 5)) + '░'.repeat(20 - Math.floor(cpuUsage / 5))}

\x1b[1;33mMemory Usage:\x1b[0m ${memoryUsage}%
${'█'.repeat(Math.floor(memoryUsage / 5)) + '░'.repeat(20 - Math.floor(memoryUsage / 5))}

\x1b[1;33mDisk Usage:\x1b[0m ${diskUsage}%
${'█'.repeat(Math.floor(diskUsage / 5)) + '░'.repeat(20 - Math.floor(diskUsage / 5))}

\x1b[1;33mNetwork:\x1b[0m ${getRandomValue(1, 100)}MB/s ↓ ${getRandomValue(1, 20)}MB/s ↑
`;
};

const showHelp = () => {
  return `
\x1b[1;36m=== PANCRATE HELP ===\x1b[0m

Available commands:

  \x1b[1;32mhelp\x1b[0m                      Show this help message
  \x1b[1;32mpan <tool> [options]\x1b[0m      Run a Pancrate tool
  \x1b[1;32mpan install\x1b[0m                Install or update Pancrate
  \x1b[1;32mpan list\x1b[0m                  List installed tools
  \x1b[1;32mpan stats\x1b[0m                 Show system statistics
  \x1b[1;32mpan update\x1b[0m                Update all tools
  \x1b[1;32mpan run <file.pan>\x1b[0m        Execute a .pan script file
  \x1b[1;32mclear\x1b[0m                     Clear the terminal

Try running 'pan <tool> --help' for specific tool options.
`;
};

// Sample .pan script execution results
const panScripts = {
  "hello.pan": `
\x1b[1;32m[SCRIPT]\x1b[0m Executing hello.pan...
\x1b[1;32m[OUTPUT]\x1b[0m Hello, world! This is a basic .pan script.
\x1b[1;32m[DONE]\x1b[0m Script executed successfully in 0.23s
`,
  "build.pan": `
\x1b[1;32m[SCRIPT]\x1b[0m Executing build.pan...
\x1b[1;32m[INFO]\x1b[0m Building project from source
\x1b[1;32m[INFO]\x1b[0m Running pre-build hooks
\x1b[1;32m[INFO]\x1b[0m Compiling modules (32/32)
\x1b[1;32m[INFO]\x1b[0m Running post-build validations
\x1b[1;32m[SUCCESS]\x1b[0m Build completed successfully in 3.21s
\x1b[1;32m[ARTIFACTS]\x1b[0m Output stored in /dist
`,
  "deploy.pan": `
\x1b[1;32m[SCRIPT]\x1b[0m Executing deploy.pan...
\x1b[1;32m[INFO]\x1b[0m Validating deployment configuration
\x1b[1;32m[INFO]\x1b[0m Authenticating with deployment server
\x1b[1;32m[INFO]\x1b[0m Uploading build artifacts (24.3 MB)
\x1b[1;32m[INFO]\x1b[0m Running pre-deployment checks
\x1b[1;32m[INFO]\x1b[0m Spinning up new instances
\x1b[1;32m[INFO]\x1b[0m Running database migrations
\x1b[1;32m[INFO]\x1b[0m Switching traffic to new instances
\x1b[1;32m[SUCCESS]\x1b[0m Deployment completed successfully
\x1b[1;32m[URL]\x1b[0m Your application is live at: https://app.example.com
`,
  "test.pan": `
\x1b[1;32m[SCRIPT]\x1b[0m Executing test.pan...
\x1b[1;32m[INFO]\x1b[0m Running test suite
\x1b[1;32m[TEST]\x1b[0m Core module tests: 24 passed, 0 failed
\x1b[1;32m[TEST]\x1b[0m API endpoint tests: 18 passed, 1 failed
\x1b[1;33m[FAIL]\x1b[0m test/api/user.test.js:24 - Expected 200 but got 403
\x1b[1;32m[TEST]\x1b[0m Database integration: 12 passed, 0 failed
\x1b[1;32m[TEST]\x1b[0m UI component tests: 35 passed, 0 failed
\x1b[1;33m[SUMMARY]\x1b[0m 89 tests passed, 1 test failed
`
};

// List of available tools and their descriptions
const availableTools = [
  { name: "build", description: "Build project from source code" },
  { name: "deploy", description: "Deploy your application to production" },
  { name: "test", description: "Run test suites against your code" },
  { name: "lint", description: "Analyze code for potential problems" },
  { name: "db", description: "Database management utilities" },
  { name: "api", description: "API development and testing tools" },
  { name: "ui", description: "UI component development toolkit" },
];

export const handleCommand = (command: string): CommandResult => {
  const commandLower = command.toLowerCase();
  const commandParts = commandLower.split(' ');
  
  if (commandLower === 'help') {
    return {
      output: showHelp(),
      isEasterEgg: false,
    };
  }
  
  if (commandLower === 'moo') {
    return {
      output: generateASCIICow(),
      isEasterEgg: true,
    };
  }
  
  if (commandLower === 'hacker-mode' || commandLower === 'hackermode') {
    return {
      output: generateHackerText(),
      isEasterEgg: true,
    };
  }
  
  if (commandLower === 'pan stats' || commandLower === 'stats') {
    return {
      output: showSystemStats(),
      isEasterEgg: false,
    };
  }
  
  if (commandLower === 'clear' || commandLower === 'cls') {
    // Special case - will be handled in the Terminal component
    return {
      output: '',
      isEasterEgg: false,
    };
  }
  
  if (commandLower === 'pan list') {
    let output = "\x1b[1;36m=== INSTALLED TOOLS ===\x1b[0m\n\n";
    availableTools.forEach(tool => {
      output += `\x1b[1;32m${tool.name.padEnd(10)}\x1b[0m ${tool.description}\n`;
    });
    return {
      output,
      isEasterEgg: false,
    };
  }
  
  if (commandParts[0] === 'pan' && commandParts[1] === 'run') {
    const scriptName = commandParts[2];
    
    if (!scriptName) {
      return {
        output: "Error: No script file specified. Usage: pan run <file.pan>",
        isEasterEgg: false,
      };
    }
    
    if (!scriptName.endsWith('.pan')) {
      return {
        output: `Error: Script file must have .pan extension. Got: ${scriptName}`,
        isEasterEgg: false,
      };
    }
    
    // Check if we have a predefined script
    if (panScripts[scriptName]) {
      return {
        output: panScripts[scriptName],
        isEasterEgg: false,
      };
    }
    
    // Handle generic script
    return {
      output: `
\x1b[1;32m[SCRIPT]\x1b[0m Executing ${scriptName}...
\x1b[1;33m[WARN]\x1b[0m Script file not found in the current directory
\x1b[1;33m[HELP]\x1b[0m Available example scripts: hello.pan, build.pan, deploy.pan, test.pan
`,
      isEasterEgg: false,
    };
  }
  
  if (commandParts[0] === 'pan') {
    const toolName = commandParts[1];
    
    if (!toolName) {
      return {
        output: "Usage: pan <tool> [options]. Run 'pan list' to see available tools.",
        isEasterEgg: false,
      };
    }
    
    const tool = availableTools.find(t => t.name === toolName);
    
    if (tool) {
      return {
        output: `Running Pancrate tool: ${toolName}\n\n\x1b[1;32m[${toolName.toUpperCase()}]\x1b[0m Starting ${tool.description.toLowerCase()}...\n\x1b[1;32m[DONE]\x1b[0m ${toolName} completed successfully.`,
        isEasterEgg: false,
      };
    }
    
    if (toolName === "install" || toolName === "update") {
      return {
        output: `
\x1b[1;32m[PANCRATE]\x1b[0m ${toolName === "install" ? "Installing" : "Updating"} Pancrate...
\x1b[1;32m[INFO]\x1b[0m Checking for latest version
\x1b[1;32m[INFO]\x1b[0m Downloading packages...
\x1b[1;32m[INFO]\x1b[0m Installing dependencies...
\x1b[1;32m[SUCCESS]\x1b[0m Pancrate has been ${toolName === "install" ? "installed" : "updated"} to version 1.2.0
\x1b[1;32m[INFO]\x1b[0m Run 'pan list' to see available tools
`,
        isEasterEgg: false,
      };
    }
    
    return {
      output: `Error: Unknown tool '${toolName}'. Run 'pan list' to see available tools.`,
      isEasterEgg: false,
    };
  }
  
  return {
    output: `Command not found: ${command}\nType 'help' to see available commands.`,
    isEasterEgg: false,
  };
};
