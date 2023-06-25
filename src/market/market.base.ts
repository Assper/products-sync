import { MarketConfig } from 'src/config/market.config';

type BaseOptions = {
  headers: {
    Authorization: string;
  };
};

export abstract class MarketBase {
  protected abstract readonly base: string;
  protected readonly options: BaseOptions;

  constructor(protected readonly config: MarketConfig) {
    this.options = {
      headers: {
        Authorization: `Bearer ${this.config.access}`,
      },
    };
  }
}
