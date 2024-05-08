import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla'
    // }
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find(car => car.id == id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCar: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCar
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCar: UpdateCarDto) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map(car => {
      if (car.id == id) {
        carDB = {
          ...carDB,
          ...updateCar,
          id
        }
        return carDB;
      }
      return car;
    })

    return carDB;
  }

  delete(id: string) {
    let carDB = this.findOneById(id);
    if(!carDB) throw new NotFoundException();
    this.cars = this.cars.filter(car => car.id != id)
  }

  fillCarsWithSeedData( cars: Car[] ) {
    this.cars = cars;
  }

}
