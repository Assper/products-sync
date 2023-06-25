import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { ProudctsRepository } from './products.repository';
import { Product } from './products.schema';
import { Service } from './service.abstract';
import { MarketProduct } from 'src/market/market.repository';

@Injectable()
export class ProductsService extends Service<ProudctsRepository, Product> {
  constructor(protected readonly repository: ProudctsRepository) {
    super();
  }

  async get(
    filter: FilterQuery<Product>,
    skip: number,
    limit: number,
  ): Promise<Product[]> {
    return this.repository.find(filter, { skip, limit });
  }

  async syncData(products: MarketProduct[], syncId: string) {
    return await this.repository.syncData(products, syncId);
  }

  async syncCleanup(syncId: string) {
    return await this.repository.syncCleanup(syncId);
  }
}
