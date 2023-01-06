import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entity/cart.entity';
import { OrderItem } from './entity/OrderItem';
import { Product } from 'src/product/entity/product.entity';
import { SaleRevenue } from './entity/SaleRevenue.entity';
import { Province } from './entity/Province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, OrderItem, Product, SaleRevenue, Province])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }
