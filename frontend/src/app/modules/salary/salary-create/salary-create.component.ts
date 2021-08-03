import { DatePipe } from "@angular/common";
import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Subscriber } from "rxjs";
import { SalaryService } from "src/app/services/salary/salary.service";
import { UserService } from "src/app/services/user/user.service";
import { User } from "../../user/user.interface";
import { Salary } from "../salary.interface";

@Component({
  selector: 'app-salary-create',
  templateUrl: './salary-create.component.html',
  styleUrls: ['./salary-create.component.scss'],
  providers: [
    DatePipe,
    MessageService
  ]
})

export class SalaryCreateComponent implements OnInit  {
  submitted = false;
  salaryForm: FormGroup;
  user: any;
  usersOptions: User[] = [];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private _activatedroute:ActivatedRoute,
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router,
    private _salaryService: SalaryService,
    private _userService: UserService) {

      this.salaryForm = this._formBuilder.group({
        id: new FormControl(''),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        salary: new FormControl('', Validators.required),
        discounts: new FormControl(''),
        date: new FormControl('', Validators.required)
      });
  }

  ngOnInit() {
    this._activatedroute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this._salaryService.getSalary(id).subscribe(result => {
          if (result) {
            this.updateForm(result);
          }
        }, error => {
          this._messageService.add({severity:'error', summary:'Rejected', detail:'Salary not found'});
        })
      }
    });

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

  onSubmit(): void {
    this.submitted = true;

    if (this.salaryForm.invalid) {
      return;
    }

    const dataToSave = this.getDataToPost();
    if (this.formControls.id.value != '') {
      this.put(dataToSave);
    } else {
      this.post(dataToSave);
    }
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

  post(dataToSave: Salary) {
    this._salaryService.createSalary(dataToSave).subscribe(result => {
      this._messageService.add({severity:'info', summary:'Confirmed', detail:'Salary created'});
      this.resetForm();
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail:'An error has occurred'});
    });
  }

  put(dataToSave: Salary) {
    this._salaryService.updateSalary(this.salaryForm.controls.id.value, dataToSave).subscribe(result => {
      this._messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
      this.onReset();
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail:error});
    });
  }

  updateForm(result: Salary): void {
    this.salaryForm.setValue({
      id: result.id || '',
      cpf: result.cpf || '',
      salary: result.salary || '',
      date: result.date || '',
      discounts: result.discounts || ''
    });
  }

  resetForm() {
    this.formControls.id.setValue('');
    this.formControls.cpf.setValue('');
    this.formControls.salary.setValue('');
    this.formControls.discounts.setValue('');
    this.formControls.date.setValue('');
  }

  onReset(): void {
    this._router.navigate(['/salary-create']);
  }
}
