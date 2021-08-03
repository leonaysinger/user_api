import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { UserService } from "src/app/services/user/user.service";
import { User } from "../user.interface";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [
    DatePipe,
    MessageService
  ]
})

export class UserCreateComponent implements OnInit  {
  submitted = false;
  userForm: FormGroup;
  user: any;
  editing = false;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private _datePipe: DatePipe,
    private _userService: UserService,
    private _activatedroute:ActivatedRoute,
    private _messageService: MessageService,
    private _router: Router,
    private _formBuilder: FormBuilder) {
      this.userForm = this._formBuilder.group({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        birthday: new FormControl('', Validators.required),
      });
    }


  ngOnInit() {
    this._activatedroute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editing = true;
        this._userService.getUser(id).subscribe(result => {
          if (result) {
            this.updateForm(result);
          }
        }, error => {
          this._messageService.add({severity:'info', summary:'Confirmed', detail:'User not found'});
        })
      }
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const dataToSave = this.getDataToPost();
    if (this.formControls.id.value != '' && this.formControls.id.value != null) {
      this.put(dataToSave);
    } else {
      this.post(dataToSave);
    }
  }

  post(dataToSave: User) {
    this._userService.createUser(dataToSave).subscribe(result => {
      this._messageService.add({severity:'info', summary:'Confirmed', detail:'User created'});
      this.resetForm();
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail: error.error});
    });
  }

  put(dataToSave: User) {
    this._userService.updateUser(this.formControls.id.value, dataToSave).subscribe(result => {
      this._messageService.add({severity:'info', summary:'Confirmed', detail:'User updated'});
      this.resetForm();
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail:error.message});
    });
  }

  getDataToPost() {
    const dateTansformed = this._datePipe.transform(this.formControls.birthday.value, 'yyyy-MM-dd', this.locale);
    return {
      cpf: this.formControls.cpf.value,
      name: this.formControls.name.value,
      birthday: dateTansformed
    }
  }

  updateForm(result: User): void {
    this.userForm.setValue({
      id: result.id,
      name: result.name,
      cpf: result.cpf,
      birthday: result.birthday
    });
  }

  resetForm() {
    this.formControls.id.setValue('');
    this.formControls.name.setValue('');
    this.formControls.cpf.setValue('');
    this.formControls.birthday.setValue('');
  }

  onReset() {
      this.userForm.reset();
      if (this.editing) {
        this._router.navigate(['/user-create']);
      }
  }
}
