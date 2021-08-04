import { Component, OnInit } from "@angular/core";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main_menu.component.html',
  styleUrls: ['./main_menu.component.scss']
})

export class MainMenuComponent implements OnInit  {
    items: MenuItem[];

    constructor() {
      this.items = [];
    }

    ngOnInit() {
        this.items = [
            {
                label:'User',
                icon:'pi pi-users',
                routerLink: ['/users']
            },
            {
                label:'Salary',
                icon:'pi pi-money-bill',
                routerLink: ['/salaries']
            }
        ];
    }
}
