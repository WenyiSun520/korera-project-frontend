import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {path:'', redirectTo:"resource-list", pathMatch:"full"},
  {path:"resource-list", component: ResourceComponent},
  {path:"project-list", component:ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
