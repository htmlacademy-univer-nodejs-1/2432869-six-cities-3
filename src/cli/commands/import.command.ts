import { createOffer } from '../../shared/helpers/create-offer.js';
import { getErrorMessage } from '../../shared/helpers/get-errors-message.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filePath] = parameters;
    const fileReader = new TSVFileReader(filePath.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onImportEnd);

    try {
      await fileReader.read();
    } catch (err) {

      console.error(`Can't import data from file: ${filePath}`);
      console.error(getErrorMessage(err));
    }
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onImportEnd(linesCount: number) {
    console.info(`${linesCount} rows imported`);
  }
}
