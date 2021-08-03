import { DatePipe } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { MessageService } from "primeng/api";
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { MenubarModule } from "primeng/menubar";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { SalaryService } from "src/app/services/salary/salary.service";
import { UserService } from "src/app/services/user/user.service";
import { SalaryListComponent } from "./salary-list.component";


describe('SalaryListComponent', () => {

  class MockSalaryService {};

  let fixture: ComponentFixture<SalaryListComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        SalaryListComponent
      ],
      providers: [
        DatePipe,
        MessageService,
        { provide: SalaryService, useClass: MockSalaryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryListComponent);
  });

  it('Should create the component', () => {
    const instance = fixture.componentInstance;
    expect(instance).toBeTruthy();
  });
});