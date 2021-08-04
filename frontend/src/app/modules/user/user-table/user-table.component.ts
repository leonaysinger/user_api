import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { UserService } from "src/app/services/user/user.service";
import { User } from "../user.interface";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  providers: [
    ConfirmationService,
    DatePipe,
    MessageService
  ]
})

export class UserTableComponent implements OnInit  {
  userForm: FormGroup;
  userDialog = false;
  users: User[] = [];
  user: any;
  selectedUsers: User[] = [];
  submitted = false;
  totalRecords = 0;
  displayDialog = false;
  dialogTitle = '';
  dialogValue = '';
  editing = false;


  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private _confirmationService: ConfirmationService,
    private _datePipe: DatePipe,
    private _userService: UserService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder) {
      this.userForm = this._formBuilder.group({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        birthday: new FormControl('', Validators.required),
      });
    }

    ngOnInit() {
        this.loadTable();
    }

    get formControls(): { [key: string]: AbstractControl } {
        return this.userForm.controls;
    }

    loadTable() {
        this._userService.getAll().subscribe(resp => {
          this.totalRecords = resp.count;
          this.users = resp.results;
        }, error => {
          this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot list the users.'});
        });
      }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: User) {
        this.user = {...user};
        this.editing = true;
        this.updateForm(user);
        this.userDialog = true;
    }

    updateForm(result: User): void {
        this.userForm.setValue({
          id: result.id,
          name: result.name,
          cpf: result.cpf,
          birthday: result.birthday
        });
      }

    deleteSelectedUsers() {
        this._confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedUsers.forEach(user => {
                    this.deleteUser(user);
                });
            }
        });
    }

    deleteUserDialog(user: User) {
        this._confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteUser(user);
            }
        });
    }

    deleteUser(user: User): void {
        if (!user.id) {
          return;
        }
    
        this._userService.deleteUser(user.id).subscribe(result => {
            this.users = this.users.filter(val => val.id !== user.id);
            this.user = {};
            this._messageService.add({severity:'info', summary:'Confirmed', detail:'User deleted', life: 4000});
        }, error => {
          this._messageService.add({severity:'error', summary:'Rejected', detail:error.message});
        });
    }

    resetForm() {
        this.formControls.id.setValue('');
        this.formControls.name.setValue('');
        this.formControls.cpf.setValue('');
        this.formControls.birthday.setValue('');
    }

    hideDialog() {
        this.editing = false;
        this.userDialog = false;
        this.submitted = false;
        this.resetForm();
    }

    onSubmit(): void {
        this.submitted = true;
    
        if (this.userForm.invalid) {
          return;
        }
    
        const dataToSave = this.getDataToPost();
        if (this.editing) {
          this.put(dataToSave);
        } else {
          this.post(dataToSave);
        }
    }

    post(dataToSave: User) {
        this._userService.createUser(dataToSave).subscribe(result => {
            this._messageService.add({severity:'info', summary:'Confirmed', detail:'User created'});
            this.hideDialog();
            this.loadTable();
        }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail: error.message});
        });
    }

    put(dataToSave: User) {
        this._userService.updateUser(this.formControls.id.value, dataToSave).subscribe(result => {
            this._messageService.add({severity:'info', summary:'Confirmed', detail:'User updated'});
            this.hideDialog();
            this.loadTable();
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

    showUserSalaryMean(user: User): void {
        if (!user || !user.cpf) {
          return;
        }
        this.displayDialog = true;
        this.dialogTitle = 'User salary mean';
        this._userService.userMean(user.cpf).subscribe(resp => {
          if (resp) {
            this.dialogValue = resp.salary__avg;
          }
        }, error => {
          this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot display the user salary.'});
        });
    }
    
    showUserMaxSalary(user: User): void {
        if (!user || !user.cpf) {
            return;
        }
        this.displayDialog = true;
        this.dialogTitle = 'User max salary';
        this._userService.userMaxSalary(user.cpf).subscribe(resp => {
            if (resp) {
            this.dialogValue = resp.salary__max;
            }
        }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot display the user max salary.'});
        });
    }

    showUserMinSalary(user: User): void {
        if (!user || !user.cpf) {
            return;
        }
        this.displayDialog = true;
        this.dialogTitle = 'User min salary';
        this._userService.userMinSalary(user.cpf).subscribe(resp => {
            if (resp) {
            this.dialogValue = resp.salary__min;
            }
        }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot display the user min salary.'});
        });
    }

    showUserDiscountMean(user: User): void {
        if (!user || !user.cpf) {
            return;
        }
        this.displayDialog = true;
        this.dialogTitle = 'User discount mean';
        this._userService.userDiscountMean(user.cpf).subscribe(resp => {
            if (resp) {
            this.dialogValue = resp;
            }
        }, error => {
            this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot display the salary discount mean.'});
        });
    }

    cleanDialog(event: any) {
        this.dialogTitle = '';
        this.dialogValue  = '';
    }

    getCpfCnpjMask(): string{
        return '000.000.000-00';
     }
}
    