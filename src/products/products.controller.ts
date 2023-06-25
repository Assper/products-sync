import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  get(
    @Param('skip') skip: string,
    @Param('limit') limit: string,
  ): Promise<Product[]> {
    return this.service.get({}, Number(skip), Number(limit));
  }
}
