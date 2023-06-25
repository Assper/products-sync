import { Injectable } from '@nestjs/common';
import { MarketProduct, MarketRepository } from './market.repository';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MarketService {
  constructor(private readonly repository: MarketRepository) {}

  async getProducts(skip: number, limit: number): Promise<MarketProduct[]> {
    const products = await lastValueFrom(
      this.repository.getProducts(skip, limit),
    );
    return products;
  }
}
