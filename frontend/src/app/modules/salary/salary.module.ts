import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SalaryTableComponent } from './salary-table/salary-table.component';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { CpfPipeModule } from 'src/app/pipes/cpf.pipe.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    CpfPipeModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    MenubarModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  declarations: [
    SalaryTableComponent
  ],
  exports: [
    SalaryTableComponent
  ]
})
export class SalaryModule { }
