import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";
import { User } from "../user.interface";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class UserListComponent implements OnInit  {
  users: User[] = [];
  loading: boolean = false;
  totalRecords: number;
  displayDialog: boolean = false;
  dialogTitle = '';
  dialogValue: any;

  constructor(
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _userService: UserService,
    private _router: Router) {

      this.users = [];
      this.totalRecords = 0;
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this._userService.getAll().subscribe(resp => {
      this.totalRecords = resp.count;
      this.users = resp.results;
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail:'Cannot list the users.'});
    });
  }

  clear(table: any): void {
    table.clear();
  }

  editUser(user: User): void {
    if (!user || !user.id) {
      return;
    }

    this._router.navigate(['/user-create', user.id]);
  }

  confirmDelete(user:User): void {
    this._confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
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
      this._messageService.add({severity:'info', summary:'Confirmed', detail:'User deleted'});
      this.loadTable();
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail:error.message});
    });
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
    this.dialogTitle = 'User max mean';
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
    this.dialogTitle = 'User min mean';
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
    this.dialogValue  = null;
  }
}
