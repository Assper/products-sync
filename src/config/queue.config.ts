import { Injectable } from '@nestjs/common';
import {
  SharedBullConfigurationFactory,
  BullModuleOptions,
} from '@nestjs/bull';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { isInt, isString } from 'class-validator';

@Injectable()
export class QueueConfig implements SharedBullConfigurationFactory {
  readonly port: number;
  readonly host: string;
  readonly password: string;

  constructor(private readonly configService: NestConfigService) {
    this.port = parseInt(this.configService.get('redis.port'));
    this.host = this.configService.get('redis.host');
    this.password = this.configService.get('redis.password');

    this.validate();
  }

  private validate(): void {
    if (!this.port || !isInt(this.port)) {
      throw new Error(`${QueueConfig.name} - port should be an integer`);
    }

    if (!this.host || !isString(this.host)) {
      throw new Error(`${QueueConfig.name} - host should be a string`);
    }

    if (!this.password || !isString(this.password)) {
      throw new Error(`${QueueConfig.name} - password should be a string`);
    }
  }

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.host,
        port: this.port,
        password: this.password,
      },
    };
  }
}
