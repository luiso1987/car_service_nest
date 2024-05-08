import { v4 as uuid } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'SEAT',
    model: 'Ateca'
  },
  {
    id: uuid(),
    brand: 'SEAT',
    model: 'Leon FR'
  },
  {
    id: uuid(),
    brand: 'Volkswagen',
    model: 'Golf'
  },
  {
    id: uuid(),
    brand: 'BMW',
    model: 'i380'
  },  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Honda'
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic'
  }
]