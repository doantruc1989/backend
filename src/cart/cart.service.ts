import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { Repository, Like, Between } from 'typeorm';
import SaveOrderdto from './dto/saveOrder.dto';
import { CartItem } from './entity/cart.entity';
import { OrderItem } from './entity/OrderItem';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartItem)
        private cartRepository: Repository<CartItem>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async saveOrder(saveOrderdto: SaveOrderdto) {
        const item = JSON.parse(saveOrderdto.orderItems)
        console.log(item);
        let revenue: number;
        let totalRevenue: number = 0;
        for (let i = 0; i < item.length; i++) {
            const productId = item[i].id;
            const qty = item[i].quantity;
            const product = await this.productRepository.findOneBy({ id: productId });
            product.quantity = product.quantity - qty;
            await this.productRepository.save(product);
            revenue = (product.price - product.initialPrice) * qty;
            totalRevenue += revenue;
            saveOrderdto.revenue = totalRevenue;
            await this.orderItemRepository.save(saveOrderdto)
        }
    }

    async getListOrder() {
        return await this.orderItemRepository.find()
    }

    async adminGetSaleDay() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const sale = await this.orderItemRepository
            .createQueryBuilder('order')
            .where(`createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
            .getMany()
        let todaySale = 0;
        for (let i = 0; i < sale.length; i++) {
            todaySale += sale[i].cartTotal;
        };
        return todaySale
    }

    async adminGetSaleWeek() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastweek = new Date(start);
        lastweek.setDate(start.getDate() - 7)
        const sale = await this.orderItemRepository
            .createQueryBuilder('order')
            .where(`createdAt BETWEEN '${lastweek.toISOString()}' AND '${end.toISOString()}'`)
            .getMany()
        let thisWeekSale = 0;
        for (let i = 0; i < sale.length; i++) {
            thisWeekSale += sale[i].cartTotal;
        };
        return thisWeekSale
    }

    async adminGetSaleMonth() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastmonth = new Date(start);
        lastmonth.setDate(start.getDate() - 30)
        const sale = await this.orderItemRepository
            .createQueryBuilder('order')
            .where(`createdAt BETWEEN '${lastmonth.toISOString()}' AND '${end.toISOString()}'`)
            .getMany()
        let thisMonthSale = 0;
        for (let i = 0; i < sale.length; i++) {
            thisMonthSale += sale[i].cartTotal;
        };
        return thisMonthSale
    }

    async adminGetRevenueDay() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const revenue = await this.orderItemRepository
            .createQueryBuilder('order')
            .where(`createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
            .getMany()
        let todayRevenue = 0;
        for (let i = 0; i < revenue.length; i++) {
            todayRevenue += revenue[i].revenue;
        };
        return todayRevenue
    }

    async adminGetRevenueWeek() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastweek = new Date(start);
        lastweek.setDate(start.getDate() - 7)
        const revenue = await this.orderItemRepository
            .createQueryBuilder('order')
            .where(`createdAt BETWEEN '${lastweek.toISOString()}' AND '${end.toISOString()}'`)
            .getMany()
        let thisWeekyRevenue = 0;
        for (let i = 0; i < revenue.length; i++) {
            thisWeekyRevenue += revenue[i].revenue;
        };
        return thisWeekyRevenue
    }

    async adminGetRevenueMonth() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastMonth = new Date(start);
        lastMonth.setDate(start.getDate() - 30)
        const revenue = await this.orderItemRepository
            .createQueryBuilder('order')
            .where(`createdAt BETWEEN '${lastMonth.toISOString()}' AND '${end.toISOString()}'`)
            .getMany()
        let thisMonthRevenue = 0;
        for (let i = 0; i < revenue.length; i++) {
            thisMonthRevenue += revenue[i].revenue;
        };
        return thisMonthRevenue
    }

    adminChartWeek = async () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastweek = new Date(start);
        lastweek.setDate(start.getDate() - 7)
        const week = await this.orderItemRepository
            .createQueryBuilder('order')
            .select("SUM(order.cartTotal)", 'sale')
            .addSelect("SUM(order.revenue)", 'revenue')
            .addSelect('DATE_FORMAT(createdAt, "%d %b")', 'date')
            .groupBy('DATE_FORMAT(createdAt, "%j")')
            .where(`createdAt BETWEEN '${lastweek.toISOString()}' AND '${end.toISOString()}'`)
            .getRawMany()
        return week
    }

    adminChartMonth = async () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastMonth = new Date(start);
        lastMonth.setDate(start.getDate() - 30)
        const month = await this.orderItemRepository
            .createQueryBuilder('order')
            .select("SUM(order.cartTotal)", 'sale')
            .addSelect("SUM(order.revenue)", 'revenue')
            .addSelect('DATE_FORMAT(createdAt, "%d %b")', 'date')
            .groupBy('DATE_FORMAT(createdAt, "%j")')
            .where(`createdAt BETWEEN '${lastMonth.toISOString()}' AND '${end.toISOString()}'`)
            .getRawMany()
        return month
    }

    adminTotalOrder = async (field: number) => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        const lastMonth = new Date(start);
        lastMonth.setDate(start.getDate() - field)
        const order = await this.orderItemRepository
            .createQueryBuilder('order')
            .select("COUNT(order.id)")
            .where(`createdAt BETWEEN '${lastMonth.toISOString()}' AND '${end.toISOString()}'`)
            .getCount()
        return order;
    }
}
