import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver, Position } from '../models/driver.type';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private drivers$: BehaviorSubject<Driver[]> = new BehaviorSubject<Driver[]>([]);
  private boardSize: number = environment.boardSize;

  constructor() { }

  getDrivers(): Observable<Driver[]> {
    return this.drivers$.asObservable();
  }

  createDrivers(quantity: number) {
    for(let i=0; i < quantity; i++) {
      this.createDriver();
    }
  }

  createDriver() {
    const driver: Driver = new Driver(
      new Position(
      Math.floor(Math.random() * this.boardSize),
      Math.floor(Math.random() * this.boardSize)
      ),
      this.getDriverColor()
    )
    this.addDriver(driver);
  }

  addDriver(driver: Driver) {
    this.drivers$.value.push(driver);
    this.drivers$.next(this.drivers$.getValue());
  }

  private getDriverColor(): string {
    return '#'+Math.floor(Math.random()*16777215).toString(16)
  }
}
