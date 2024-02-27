// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;

    try {
      await this.load(url);
      await this.write(filePath, +count);
      console.info(`File ${filePath} was created`);
    } catch (err) {
      console.error('Can\'t generate data');

      console.error(getErrorMessage(err));
    }
  }

  private async load(url: string) {
    try {
      this.initialData = got.get(url).json();
    } catch (err) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }
}
