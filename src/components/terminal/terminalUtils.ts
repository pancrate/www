
import { Terminal as XTerm } from 'xterm';
import { handleCommand } from '../../utils/terminalCommands';
import { toast } from "@/components/ui/use-toast";

export const processCommand = (term: XTerm, command: string) => {
  const result = handleCommand(command.trim());
  
  if (result.isEasterEgg) {
    toast({
      title: "Easter Egg Found!",
      description: `You discovered a hidden feature: ${command}`,
      variant: "default",
    });
  }
  
  // Handle the clear command
  if (command.trim().toLowerCase() === 'clear' || command.trim().toLowerCase() === 'cls') {
    term.clear();
    return result;
  }
  
  // Display the output
  const lines = result.output.split('\n');
  lines.forEach(line => {
    term.writeln(line);
  });
  
  return result;
};
