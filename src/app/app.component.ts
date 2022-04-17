import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DriverService } from './services/driver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public boardSize: number = environment.boardSize;
  private driverQuantity: number = environment.driverQuantity
  constructor(private driverService: DriverService){}

  ngOnInit() {
    this.driverService.createDrivers(this.driverQuantity);
  }
}
