import { Controller, Get, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.entity';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.restaurantService.search(query);
  }

  @Post()
  async create(@Body() restaurant: Restaurant) {
    return this.restaurantService.indexRestaurant(restaurant);
  }

  @Get()
  async getAllRestaurants() {
    return this.restaurantService.getAllRestaurants();
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }
} 