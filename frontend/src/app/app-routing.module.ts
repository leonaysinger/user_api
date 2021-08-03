import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './modules/user/user-create/user-create.component';
import { UserListComponent } from './modules/user/user-list/user-list.component';
import { SalaryCreateComponent } from './modules/salary/salary-create/salary-create.component';
import { SalaryListComponent } from './modules/salary/salary-list/salary-list.component';

const routes: Routes = [
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-create/:id', component: UserCreateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'salary-create', component: SalaryCreateComponent },
  { path: 'salary-create/:id', component: SalaryCreateComponent },
  { path: 'salary-list', component: SalaryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
