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
  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService
        .getDrivers()
        .subscribe(
          (drivers) =>{
            this.drivers = drivers;
          }
        )
  }

  getDriverAtPosition(x: number, y: number): string {
    return this.drivers.filter(drive => drive.positionX === x && drive.positionY === y)[0]?.color
  }
}
