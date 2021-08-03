import { Component, OnInit } from "@angular/core";
import { Salary } from "../salary.interface";
import { ConfirmationService, MessageService } from 'primeng/api';
import { SalaryService } from "src/app/services/salary/salary.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class SalaryListComponent implements OnInit  {
  salaries = [];
  loading: boolean = false;

  constructor(
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router,
    private _salaryService: SalaryService
  ) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this._salaryService.getAll().subscribe(resp => {
      if (resp && resp.results) {
        this.salaries = resp.results;
      }
    }, error => {});
  };

  edit(salary: Salary) {
    if (!salary || !salary.id) {
      return;
    }
    this._router.navigate(['/salary-create', salary.id]);
  }

  confirmDelete(salary:Salary) {
    this._confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.delete(salary);
        }
    });
  }

  delete(salary: Salary) {
    if (!salary || !salary.id) {
      return;
    }

    this._salaryService.deleteSalary(salary.id).subscribe(result => {
      this._messageService.add({severity:'info', summary:'Confirmed', detail:'Salary deleted'});
      this.loadTable();
    }, error => {
      this._messageService.add({severity:'error', summary:'Rejected', detail:error.message});
    });
  }

  clear(table: any) {
    table.clear();
  }
}
