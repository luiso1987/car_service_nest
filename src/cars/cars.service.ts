import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Seat',
    //   model: 'Ateca',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((c) => {
      return c.id === id;
    });

    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, body: UpdateCarDto) {
    let carDB: Car = this.findOneById(id);

    if (body.id && body.id !== id)
      throw new BadRequestException(`
        Car id ${body.id} is not valid inside body
      `);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...body,
          id,
        };
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars.map((car, idx) => {
      if (car.id === id) this.cars.splice(idx, 1);
    });
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
