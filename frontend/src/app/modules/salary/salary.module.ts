import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SalaryCreateComponent } from './salary-create/salary-create.component';
import { SalaryListComponent } from './salary-list/salary-list.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule,
    MenubarModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule
  ],
  declarations: [
    SalaryCreateComponent,
    SalaryListComponent
  ],
  exports: [
    SalaryCreateComponent,
    SalaryListComponent
  ]
})
export class SalaryModule { }
