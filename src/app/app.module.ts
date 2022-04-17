import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardFieldComponent } from './components/board-field/board-field.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardFieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
