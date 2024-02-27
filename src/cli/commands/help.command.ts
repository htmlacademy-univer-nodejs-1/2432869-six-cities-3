import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.log(chalk.black(`
        Программа для подготовки данных для REST API сервера.
        Пример:
    `));
    console.log(chalk.blue(`
            cli.js --<command> [--arguments]
    `));
    console.log(chalk.black(`
        Команды:
    `));
    console.log(chalk.blue(`
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
