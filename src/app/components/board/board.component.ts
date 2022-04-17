import { Component, OnInit, Input } from '@angular/core';
import { Driver } from 'src/app/models/driver.type';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'sd-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public boardSize: number = 0;
  private drivers: Driver[] = [];
  private timer: any;
  constructor(private driverService: DriverService) {
    this.initInterval();

   }

  ngOnInit(): void {
    this.driverService
        .getDrivers()
        .subscribe(
          (drivers) =>{
            this.drivers = drivers;
          }
        )
  }

  initInterval() {

    this.timer = setInterval(() => {
      this.drivers.forEach(drive => {
        drive.move(this.boardSize)
      });
    }, 1000)
  }
  
  getDriverAtPosition(x: number, y: number): string {

    return this.drivers.filter(drive => drive.positionX === x && drive.positionY === y)[0]?.color
  }
}

export class DriverTrace extends Driver {
  constructor(driver: Driver) {
    super(driver.position, DriverTrace.changeColor(driver.color));
    
  }
  override move(limit: number): void {
      
  }

  static changeColor(color: string) {
    const r = parseInt(color.substring(1,3), 16);
    const g = parseInt(color.substring(3,5), 16);
    const b = parseInt(color.substring(5), 16);
    const range = 5
    return `#${this.twoDigits(Math.min(r, r+range))}${this.twoDigits(Math.min(g, g+range))}${this.twoDigits(Math.min(b, b+range))}`


  }

  static twoDigits(n: number) {  
    return n > 15?`${n.toString(16)}`:`0${n.toString(16)}`
  }
}