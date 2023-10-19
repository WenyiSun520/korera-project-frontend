import { Component,Output,EventEmitter } from '@angular/core';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';
import { Resource } from 'src/app/resource/resource';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css'],
})
export class ResourceTableComponent {
  resourceList: any;
  @Output() selectedResource = new EventEmitter<Resource>();

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceList = this.resourceService.getResourceList();
  }

  handleSubmittion(resource:Resource) {
    //console.log(resource)
    this.selectedResource.emit(resource)
  }
}
