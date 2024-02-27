import { TSVFileReader } from '../../shared/libs/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filePath] = parameters;
    const fileReader = new TSVFileReader(filePath.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {

      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file: ${filePath}`);
      console.error(`Details: ${error.message}`);
    }
  }
}
