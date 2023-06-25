import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MarketModule } from 'src/market/market.module';
import { ProductsModule } from 'src/products/products.module';
import { QUEUE_NAME } from './constants';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { SyncConsumer } from './sync.consumer';

@Module({
  imports: [
    MarketModule,
    ProductsModule,
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  controllers: [SyncController],
  providers: [SyncService, SyncConsumer],
})
export class SyncModule {}
