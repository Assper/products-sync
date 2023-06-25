import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from './constants';
import { MarketService } from 'src/market/market.service';
import { ProductsService } from 'src/products/products.service';
import { MarketProduct } from 'src/market/market.repository';

export type ProductSyncData = {
  dataToUpdate: MarketProduct[];
  dataToInsert: MarketProduct[];
};

export type ProductJobData = {
  updated: number;
  inserted: number;
  deleted: number;
  total: number;
  marketTotal: number;
  syncId: string;
};

@Processor(QUEUE_NAME)
export class SyncConsumer {
  constructor(
    private readonly market: MarketService,
    private readonly products: ProductsService,
  ) {}

  @Process()
  async sync(job: Job<ProductJobData | void>) {
    const syncId = Date.now().toString();
    const limit = 100;

    let marketProducts: MarketProduct[] = [];
    let updatedCount = 0;
    let insertedCount = 0;
    let skip = 0;
    do {
      marketProducts = await this.market.getProducts(skip, limit);
      const updated = await this.products.syncData(marketProducts, syncId);

      updatedCount += updated.modifiedCount;
      insertedCount += updated.upsertedCount;
      skip += limit;
    } while (marketProducts.length);

    const deleted = await this.products.syncCleanup(syncId);
    const result = {
      updated: updatedCount,
      inserted: insertedCount,
      deleted: deleted.deletedCount,
      total: updatedCount + insertedCount + deleted.deletedCount,
      marketTotal: updatedCount + insertedCount,
      syncId,
    };
    await job.update(result);
    return result;
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    console.error(
      `Job ${job.id} failed of type ${job.name}: ${job.failedReason}`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(
      `Job ${job.id} successfully finished of type ${job.name}:`,
      job.data,
    );
  }
}
