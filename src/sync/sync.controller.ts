import { Controller, Post } from '@nestjs/common';
import { SyncService, SyncStatus } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly service: SyncService) {}

  @Post('products')
  products(): Promise<SyncStatus> {
    return this.service.syncProducts();
  }
}
