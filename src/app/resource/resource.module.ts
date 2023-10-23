import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourcelistComponent } from './resource-list/resourcelist.component';
import { ResourceComponent } from './resource.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceService } from './resource-service/resource.service';
import { ResourceDetailService } from './resource-service/resource-detail.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ResourcelistComponent,
    ResourceComponent,
    ResourceDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [ResourcelistComponent, ResourceComponent],
  providers: [ResourceService, ResourceDetailService],
})
export class ResourceModule {}
