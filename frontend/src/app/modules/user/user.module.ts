import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    MenubarModule,
    TableModule,
    ToastModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserCreateComponent,
    UserListComponent
  ],
  exports: [
    UserCreateComponent,
    UserListComponent
  ]
})
export class UserModule { }
