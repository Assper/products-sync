import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAME } from './constants';

export type SyncStatus = 'success' | 'failed' | 'in progress';

@Injectable()
export class SyncService {
  private status: SyncStatus = 'success';

  constructor(@InjectQueue(QUEUE_NAME) private readonly queue: Queue) {}

  getStatus(): SyncStatus {
    return this.status;
  }

  async syncProducts(): Promise<SyncStatus> {
    await this.queue.add({});
    this.status = 'in progress';
    return this.status;
  }
}
