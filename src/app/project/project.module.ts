import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { FormsModule } from '@angular/forms';
import { ResourceTableComponent } from './resource-table/resource-table.component';
import { ProjectTableComponent } from './project-table/project-table.component';



@NgModule({
  declarations: [ProjectComponent, ResourceTableComponent, ProjectTableComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProjectComponent],
})
export class ProjectModule {}
