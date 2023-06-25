import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, throwError } from 'rxjs';
import { MarketBase } from './market.base';
import { MarketConfig } from 'src/config/market.config';

export type MarketProduct = {
  productId: string | null;
  name: string | null;
  vendorId: string | null;
  groupId: string | null;
  categoryId: string | null;
  familyId: string | null;
  description: string | null;
  canSellToUnderage: boolean | null;
  country: string | null;
  brandId: number | null;
  brandName: string | null;
  isMsl: boolean | null;
  barCode: string | null;
  minPurchaseAmount: number | null;
  measurementUnit: string | null;
  weight: number | null;
};

type MarketStoreResponse = {
  data: {
    products: MarketProduct[];
  };
};

@Injectable()
export class MarketRepository extends MarketBase {
  protected readonly base: string;

  constructor(config: MarketConfig, private readonly http: HttpService) {
    super(config);
    this.base = `${this.config.base}/products`;
  }

  getProducts(skip: number, limit: number): Observable<MarketProduct[]> {
    return this.http
      .get<MarketStoreResponse>(this.base, {
        ...this.options,
        data: {
          skip,
          limit,
        },
      })
      .pipe(
        map((response) => response.data.data.products),
        catchError((err) => {
          console.error(err);
          return throwError(() => err);
        }),
      );
  }
}
