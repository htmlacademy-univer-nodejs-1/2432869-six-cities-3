import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { isPackageJSONConfig } from '../../shared/libs/file-reader/index.js';

export class VersionCommand implements Command {
  constructor(
    private readonly filePath = './package.json',
  ) { }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  private readVersion(): string {
    const json = readFileSync(this.filePath, 'utf-8');
    const packageData: unknown = JSON.parse(json);

    if (!isPackageJSONConfig(packageData)) {
      throw new Error('Failed to parse json content.');
    }

    return packageData.version;
  }
}
