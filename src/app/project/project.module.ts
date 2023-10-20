import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { FormsModule } from '@angular/forms';
import { ResourceTableComponent } from './resource-table/resource-table.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { AppRoutingModule } from '../app-routing.module';
import { JoinedTableComponent } from './joined-table.component';



@NgModule({
  declarations: [
    ProjectComponent,
    ResourceTableComponent,
    ProjectTableComponent,
    JoinedTableComponent,
  ],
  imports: [CommonModule, FormsModule,AppRoutingModule],
  exports: [ProjectComponent],
})
export class ProjectModule {}
