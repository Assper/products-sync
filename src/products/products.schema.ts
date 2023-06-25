import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Product {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  productId: string;

  @Prop({
    type: String,
  })
  name?: string;

  @Prop({
    type: String,
  })
  vendorId?: string;

  @Prop({
    type: String,
  })
  img?: string;

  @Prop({
    type: String,
  })
  groupId?: string;

  @Prop({
    type: String,
  })
  categoryId?: string;

  @Prop({
    type: String,
  })
  familyId?: string;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop({
    type: Boolean,
  })
  canSellToUnderage?: boolean;

  @Prop({
    type: String,
  })
  country?: string;

  @Prop({
    type: Number,
  })
  brandId?: number;

  @Prop({
    type: String,
  })
  brandName?: string;

  @Prop({
    type: Number,
  })
  minPurchaseAmount?: number;

  @Prop({
    type: String,
  })
  measurementUnit?: string;

  @Prop({
    type: String,
  })
  barCode?: string;

  @Prop({
    type: Boolean,
  })
  isMsl?: boolean;

  @Prop({
    type: Number,
  })
  weight?: number;

  @Prop({
    type: String,
    required: true,
  })
  syncId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
