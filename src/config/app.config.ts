import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isInt } from 'class-validator';

const envs = ['production', 'test', 'development'];
type Env = 'production' | 'test' | 'development';

@Injectable()
export class AppConfig {
  readonly env: Env;
  readonly port: number;

  constructor(private readonly configService: ConfigService) {
    this.env = this.configService.get<Env>('env');
    this.port = parseInt(this.configService.get('port'));

    this.validate();
  }

  private isEnv(value: unknown): value is Env {
    return envs.includes(value as string);
  }

  private validate(): void {
    if (!this.isEnv(this.env)) {
      throw new Error(`AppConfig - Env should be some of ${envs}`);
    }

    if (!isInt(this.port)) {
      throw new Error('AppConfig - Port should be an integer');
    }
  }
}
