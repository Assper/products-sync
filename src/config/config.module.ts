import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { config } from './config';
import { AppConfig } from './app.config';
import { DbConfig } from './db.config';
import { MarketConfig } from './market.config';
import { QueueConfig } from './queue.config';

@Module({
  imports: [NestConfigModule.forRoot({ load: [config] })],
  providers: [AppConfig, DbConfig, MarketConfig, QueueConfig],
  exports: [AppConfig, DbConfig, MarketConfig, QueueConfig],
})
export class ConfigModule {}
