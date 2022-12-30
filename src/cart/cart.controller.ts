import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import SaveCartDto from './dto/saveCart.dto';
import SaveOrderdto from './dto/saveOrder.dto';

@Controller()
@ApiTags('cart-order')
export class CartController {
    constructor(private cartService: CartService) { }

    @Post('orderitem')
    async saveOrderItem(@Body() saveOrderdto: SaveOrderdto) {
        return this.cartService.saveOrder(saveOrderdto)
    }

    @Get('admin/listorder')
    async listorder() {
        return this.cartService.getListOrder()
    }

    @Get('admin/sales/day')
    async getSaleDay() {
        return this.cartService.adminGetSaleDay()
    }

    @Get('admin/sales/week')
    async getSaleWeek() {
        return this.cartService.adminGetSaleWeek()
    }

    @Get('admin/sales/month')
    async getSaleMonth() {
        return this.cartService.adminGetSaleMonth()
    }

    @Get('admin/revenue/day')
    async getRevenueDay() {
        return this.cartService.adminGetRevenueDay()
    }

    @Get('admin/revenue/week')
    async getRevenueWeek() {
        return this.cartService.adminGetRevenueWeek()
    }

    @Get('admin/revenue/month')
    async getRevenueMonth() {
        return this.cartService.adminGetRevenueMonth()
    }

    @Get('admin/chart/week')
    async getTotalWeek() {
        return this.cartService.adminChartWeek()
    }

    @Get('admin/chart/month')
    async getTotalMonth() {
        return this.cartService.adminChartMonth()
    }

    @Get('admin/countorders/:field')
    async getTotalOrder(@Param('field') field: number) {
        return this.cartService.adminTotalOrder(field)
    }
}

