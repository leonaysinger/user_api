import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './modules/user/user-table/user-table.component';
import { SalaryTableComponent } from './modules/salary/salary-table/salary-table.component';

const routes: Routes = [
  { path: 'users', component: UserTableComponent },
  { path: 'salaries', component: SalaryTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
