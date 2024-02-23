import { Commands } from '../shared/types/index.js';
import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

export class CLIApplication {
  private commands: Commands = {};

  constructor(
    private readonly defaultCommand = '--help'
  ) { }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }

    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const commands = CommandParser.parse(argv);
    const [commandName] = Object.keys(commands);
    const command = this.getCommand(commandName);
    const commandArguments = commands[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
