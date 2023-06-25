import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from 'src/config/config.module';
import { MarketRepository } from './market.repository';
import { MarketService } from './market.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MarketRepository, MarketService],
  exports: [MarketService],
})
export class MarketModule {}
