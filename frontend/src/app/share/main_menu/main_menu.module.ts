import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainMenuComponent } from './main_menu.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  imports: [
    BrowserModule,
    MenubarModule
  ],
  declarations: [ MainMenuComponent ],
  exports:      [ MainMenuComponent ]
})
export class MainMenuModule { }
