import got from 'got';
import { appendFile } from 'node:fs/promises';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-genertor.js';

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

      if (err instanceof Error) {
        console.error(err.message);
      }
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
    for (let i = 0; i < offerCount; i++) {
      await appendFile(filePath, `${tsvOfferGenerator.generate()}\n`, { encoding: 'utf-8' });
    }
  }
}
