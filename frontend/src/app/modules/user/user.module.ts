import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableComponent } from './user-table/user-table.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    MenubarModule,
    NgxMaskModule.forRoot(),
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule
  ],
  declarations: [
    UserTableComponent
  ],
  exports: [
    UserTableComponent
  ]
})
export class UserModule { }
