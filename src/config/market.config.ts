import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { isString } from 'class-validator';

@Injectable()
export class MarketConfig {
  readonly access: string;
  readonly base: string;

  constructor(private readonly configService: NestConfigService) {
    this.access = this.configService.get('market.access');
    this.base = this.configService.get('market.base');

    this.validate();
  }

  private validate(): void {
    if (!this.access || !isString(this.access)) {
      throw new Error(`${MarketConfig.name} - access should be a string`);
    }

    if (!this.base || !isString(this.base)) {
      throw new Error(`${MarketConfig.name} - base should be a string`);
    }
  }
}
