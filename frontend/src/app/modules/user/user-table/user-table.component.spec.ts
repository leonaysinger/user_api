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
import { ToolbarModule } from "primeng/toolbar";
import { UserService } from "src/app/services/user/user.service";
import { UserTableComponent } from "./user-table.component";


describe('UserCreateComponent', () => {

  class MockUserService {}

  let fixture: ComponentFixture<UserTableComponent>;
  
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
        ToastModule,
        ToolbarModule
      ],
      declarations: [
        UserTableComponent
      ],
      providers: [
        DatePipe,
        MessageService,
        { provide: UserService, useClass: MockUserService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
  });

  it('Should create the component', () => {
    const instance = fixture.componentInstance;
    expect(instance).toBeTruthy();
  });
});