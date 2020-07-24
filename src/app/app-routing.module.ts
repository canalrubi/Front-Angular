import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';


const routes: Routes = [
  {path: '',       component: LoginComponent, pathMatch: 'full'},
  {path: 'tasks',  component: ListTaskComponent,   canActivate:[AuthGuardGuard]},
  {path: 'create', component: CreateTaskComponent, canActivate:[AuthGuardGuard]},
  {path: 'login',  component: LoginComponent},
  {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
