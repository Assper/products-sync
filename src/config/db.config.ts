import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { isString } from 'class-validator';

@Injectable()
export class DbConfig implements MongooseOptionsFactory {
  readonly uri: string;

  constructor(private readonly configService: ConfigService) {
    this.uri = this.configService.get('mongo.uri');

    this.validate();
  }

  private validate(): void {
    if (!this.uri || !isString(this.uri)) {
      throw new Error(`${DbConfig.name} - uri should be a string`);
    }
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.uri,
    };
  }
}
