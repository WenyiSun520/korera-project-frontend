import { Component } from '@angular/core';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css'],
})
export class ResourceTableComponent {
  resourceList: any;

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceList = this.resourceService.getResourceList();
  }
}
