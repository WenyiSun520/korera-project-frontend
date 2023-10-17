import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourcelistComponent } from './resource-list/resourcelist.component';
import { ResourceComponent } from './resource.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceService } from './resource-service/resource.service';
import { ResourceDetailService } from './resource-service/resource-detail.service';

@NgModule({
  declarations: [
    ResourcelistComponent,
    ResourceComponent,
    ResourceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ResourcelistComponent,
    ResourceComponent
  ],
  providers:[ResourceService,ResourceDetailService]
})
export class ResourceModule { }
