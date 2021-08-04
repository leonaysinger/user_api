import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { SalaryService } from "src/app/services/salary/salary.service";
import { DatePipe } from '@angular/common';
import { Salary } from "../salary.interface";
import { User } from "../../user/user.interface";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-salary-table',
  templateUrl: './salary-table.component.html',
  styleUrls: ['./salary-table.component.scss'],
  providers: [
    ConfirmationService,
    DatePipe,
    MessageService
  ]
})

export class SalaryTableComponent implements OnInit  {
  salaryForm: FormGroup;
  salaryDialog = false;
  salaries: Salary[] = [];
  salary: any;
  selectedSalaries: Salary[] = [];
  submitted = false;
  totalRecords = 0;
  displayDialog = false;
  dialogTitle = '';
  dialogValue = '';
  editing = false;
  usersOptions = [];


  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private _confirmationService: ConfirmationService,
    private _datePipe: DatePipe,
    private _salaryService: SalaryService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder,
    private _userService: UserService) {

      this.salaryForm = this._formBuilder.group({
        id: new FormControl(''),
        salary: new FormControl('', Validators.required),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        discounts: new FormControl(''),
        date: new FormControl('', Validators.required),
      });
    }

    ngOnInit() {
        this.loadTable();
        this._userService.getAll().subscribe(resp => {
            if (resp) {
              this.usersOptions = resp.results;
            }
          }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail:'Users not found'});
          });
    }

    get formControls(): { [key: string]: AbstractControl } {
        return this.salaryForm.controls;
    }

    loadTable() {
        this._salaryService.getAll().subscribe(resp => {
          this.totalRecords = resp.count;
          this.salaries = resp.results;
        }, error => {
          this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot list the salaries.'});
        });
      }

    openNew() {
        this.salary = {};
        this.submitted = false;
        this.salaryDialog = true;
    }

    editSalary(salary: Salary) {
        this.salary = {...salary};
        this.editing = true;
        this.updateForm(salary);
        this.salaryDialog = true;
    }

    updateForm(result: Salary): void {
        this.salaryForm.setValue({
          id: result.id,
          cpf: result.cpf,
          salary: result.salary,
          discounts: result.discounts,
          date: result.date
        });
      }

    deleteSelectedSalaries() {
        this._confirmationService.confirm({
            message: 'Are you sure you want to delete the selected salaries?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedSalaries.forEach(salary => {
                    this.deleteSalary(salary);
                });
            }
        });
    }

    deleteSalaryDialog(salary: Salary) {
        this._confirmationService.confirm({
            message: 'Are you sure you want to delete ' + salary.cpf +  '/' + salary.salary + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteSalary(salary);
            }
        });
    }

    deleteSalary(salary: Salary): void {
        if (!salary.id) {
          return;
        }
    
        this._salaryService.deleteSalary(salary.id).subscribe(result => {
            this.salaries = this.salaries.filter(val => val.id !== salary.id);
            this.salary = {};
            this._messageService.add({severity:'info', summary:'Confirmed', detail:'Salary deleted', life: 4000});
        }, error => {
          this._messageService.add({severity:'error', summary:'Rejected', detail:error.message});
        });
    }

    resetForm() {
        this.formControls.id.setValue('');
        this.formControls.cpf.setValue('');
        this.formControls.salary.setValue('');
        this.formControls.discounts.setValue('');
        this.formControls.date.setValue('');
    }

    hideDialog() {
        this.editing = false;
        this.salaryDialog = false;
        this.submitted = false;
        this.resetForm();
    }

    onSubmit(): void {
        this.submitted = true;
    
        if (this.salaryForm.invalid) {
          return;
        }
    
        const dataToSave = this.getDataToPost();
        if (this.editing) {
          this.put(dataToSave);
        } else {
          this.post(dataToSave);
        }
    }

    post(dataToSave: Salary) {
        this._salaryService.createSalary(dataToSave).subscribe(result => {
            this._messageService.add({severity:'info', summary:'Confirmed', detail:'Salary created'});
            this.hideDialog();
            this.loadTable();
        }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail: error.error});
        });
    }

    put(dataToSave: Salary) {
        this._salaryService.updateSalary(this.formControls.id.value, dataToSave).subscribe(result => {
            this._messageService.add({severity:'info', summary:'Confirmed', detail:'Salary updated'});
            this.hideDialog();
            this.loadTable();
        }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail:error.message});
        });
    }

    getDataToPost() {
        const dateTansformed = this._datePipe.transform(this.formControls.date.value, 'yyyy-MM-dd', this.locale);
        return {
          cpf: this.formControls.cpf.value,
          salary: this.formControls.salary.value,
          discounts: this.formControls.discounts.value,
          date: dateTansformed
        }
    }
}
    