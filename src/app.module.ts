import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { MarketModule } from './market/market.module';
import { ProductsModule } from './products/products.module';
import { SyncModule } from './sync/sync.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConfig } from './config/db.config';
import { QueueConfig } from './config/queue.config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DbConfig,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: QueueConfig,
    }),
    HealthModule,
    LoggerModule,
    MarketModule,
    ProductsModule,
    SyncModule,
  ],
})
export class AppModule {}
