import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver, Position } from '../models/driver.type';
import { CollisionDetector } from './collision-detector.interface';

@Injectable({
  providedIn: 'root'
})
export class DriverService implements CollisionDetector {

  private readonly TRACE_ACTIVE = true;

  private drivers$: BehaviorSubject<Driver[]> = new BehaviorSubject<Driver[]>([]);
  private boardSize: number = environment.boardSize;
  private map = new Map<string, Driver>();

  constructor() { }

  hasCollision(position: Position): boolean {
    const driverAtPosition = this.getDriverAtPosition(position);
    // return !!driverAtPosition // this way it does not move to position where one has passed already

    return !!driverAtPosition && !(driverAtPosition instanceof DriverTrace);
  }

  private get drivers(): Driver[] {
    return this.drivers$.value;
  }

  getDrivers(): Observable<Driver[]> {
    return this.drivers$.asObservable();
  }

  createDrivers(quantity: number) {
    for(let i=0; i < quantity; i++) {
      this.createDriver();
    }
    this.notifyChanges();
  }

  createDriver() {
    const driver = new Driver(
      this.getValidRandomPosition(),
      this.getDriverColor()
    );

    this.addDriver(driver);
  }

  private getValidRandomPosition(): Position {
    let position: Position;

    do {

      position = new Position(random(this.boardSize), random(this.boardSize));

    } while (!this.isPositionAvaiable(position))

    return position;
  }

  private isPositionAvaiable(position: Position): boolean {
    return !this.map.get(position.toCoordinates())
  }

  addDriver(driver: Driver) {
    this.map.set(driver.position.toCoordinates(), driver);
    this.drivers.push(driver);
  }

  private notifyChanges() {
    this.drivers$.next(this.drivers$.getValue());
  }

  private getDriverColor(): string {
    return `#${random(16777215).toString(16)}`
  }

  getDriverAtPosition(position: Position): Driver | undefined {
    return this.map.get(position.toCoordinates());
  }

  moveDrivers(boardSize: number) {

    this.moveDriversWithTrace(boardSize)
      .then(currentTrace => {
        if (this.TRACE_ACTIVE) {
          currentTrace.forEach(driverTrace => this.addDriver(driverTrace));
        }
        this.notifyChanges();
      });

  }

  private async moveDriversWithTrace(boardSize: number): Promise<DriverTrace[]> {
    return new Promise((resolve) => {
      const currentTrace: DriverTrace[] = [];

      const ifMovedCallback = (driver: Driver, from: Position, to: Position) => {
          this.updatePosition(driver, from, to);
          currentTrace.push(DriverTrace.of(driver, from));
      };

      this.drivers.forEach(driver => {
        driver.move(boardSize, this, ifMovedCallback);
      });

      resolve(currentTrace);
    });
  }

  private updatePosition(driver: Driver, from: Position, to: Position) {
    this.map.delete(from.toCoordinates());
    this.map.set(to.toCoordinates(), driver);
  }
}

function random(limit: number): number {
  return Math.floor(Math.random() * limit);
}

class DriverTrace extends Driver {

  static of(driver: Driver, tracePosition: Position): Driver {
    return new DriverTrace(tracePosition, this.changeColor(driver.color));
  }

  static changeColor(color: string) {
    // #123456
    const r = parseInt(color.substring(1,3), 16); // 12
    const g = parseInt(color.substring(3,5), 16); // 34
    const b = parseInt(color.substring(5), 16);   // 56

    const range = 40

    const RR = this.twoDigits(Math.min(255, r+range));
    const GG = this.twoDigits(Math.min(255, g+range));
    const BB = this.twoDigits(Math.min(255, b+range));

    return `#${RR}${GG}${BB}`
  }

  static twoDigits(n: number) {  
    return n > 15?`${n.toString(16)}`:`0${n.toString(16)}`
  }

  private constructor(position: Position, color: string) {
    super(position, color);
  }

  override move(limit: number, collisionDetector: CollisionDetector): void {
    // nothing to do
  }
}