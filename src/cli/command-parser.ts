import { CommandData } from '../shared/types/index.js';

export class CommandParser {
  static parse(cliArguments: string[]): CommandData {
    const commands: CommandData = {};
    let currentCommand = '';

    for (const argument of cliArguments) {
      if (argument.startsWith('--')) {
        commands[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        commands[currentCommand].push(argument);
      }
    }

    return commands;
  }
}
