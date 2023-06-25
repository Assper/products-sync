import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './repository.abstract';
import { Product } from './products.schema';
import { MarketProduct } from 'src/market/market.repository';

@Injectable()
export class ProudctsRepository extends Repository<Product> {
  constructor(
    @InjectModel(Product.name)
    protected readonly model: Model<Product>,
  ) {
    super();
    this.model.syncIndexes();
  }

  async syncData(products: MarketProduct[], syncId: string) {
    return await this.model.bulkWrite<Product>(
      products.map((product) => ({
        updateOne: {
          filter: { productId: product.productId },
          update: {
            $set: {
              ...product,
              syncId,
            },
          },
          upsert: true,
        },
      })),
    );
  }

  async syncCleanup(syncId: string) {
    return await this.model.deleteMany({
      syncId: { $ne: syncId },
    });
  }
}
