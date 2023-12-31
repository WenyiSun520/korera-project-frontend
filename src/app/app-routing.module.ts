import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormulaComponent } from './formula/formula/formula.component';
import { TemplateComponent } from './formula/template/template.component';
import { JoinedTableComponent } from './project/joined-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './guard/auth.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { deactiveGuard } from './guard/deactive.guard';


const routes: Routes = [
  { path: '', redirectTo: 'resource-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'resource-list',
    component: ResourceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'project-list',
    component: ProjectComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'joined-table/:projectName',
        component: JoinedTableComponent,
        canActivate: [authGuard],
        canDeactivate: [deactiveGuard],
        children: [],
      },
      {
        path: 'formula/:projectName',
        component: FormulaComponent,
        canActivate: [authGuard],
      },
      {
        path: 'template/:projectName',
        component: TemplateComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'template',
    component: TemplateComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    authGuard,
    JwtHelperService,
  ],
})
export class AppRoutingModule {}
