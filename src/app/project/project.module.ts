import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { FormsModule } from '@angular/forms';
import { ResourceTableComponent } from './resource-table/resource-table.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { AppRoutingModule } from '../app-routing.module';
import { JoinedTableComponent } from './joined-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ProjectComponent,
    ResourceTableComponent,
    ProjectTableComponent,
    JoinedTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [ProjectComponent],
})
export class ProjectModule {}
