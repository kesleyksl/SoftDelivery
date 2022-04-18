import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Driver, Position } from 'src/app/models/driver.type';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'sd-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements /* OnInit, */ OnDestroy {

  @Input() public boardSize: number = 0;

  private timer: any;

  constructor(private driverService: DriverService) {
    this.initInterval();
  }

  ngOnInit(): void {
    this.driverService
        .getDrivers()
        .subscribe(
          (drivers) =>{
            // nothing to do
          }
        )
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  initInterval() {

    this.timer = setInterval(() => {
      this.driverService.moveDrivers(this.boardSize);
    }, 100)
  }

  addDriver() {
    this.driverService.createDrivers(1);
  }
  
  getDriverAtPosition(x: number, y: number): string {
    return this.driverService.getDriverAtPosition(new Position(x, y))?.color || "";
  }
}
