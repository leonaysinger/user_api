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
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                        routerLink: ['/user-create']
                    },
                    {
                        label:'List',
                        icon:'pi pi-list',
                        routerLink: ['/user-list']
                    }
                ]
            },
            {
                label:'Salary',
                icon:'pi pi-money-bill',
                items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-plus',
                      routerLink: ['/salary-create']
                  },
                  {
                      label:'List',
                      icon:'pi pi-list',
                      routerLink: ['/salary-list']
                  }
              ]
            }
        ];
    }
}
