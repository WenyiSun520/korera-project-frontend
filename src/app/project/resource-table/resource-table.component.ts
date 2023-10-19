import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';
import { Resource } from 'src/app/resource/resource';
import { ProjectService } from '../project-service/project.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css'],
})
export class ResourceTableComponent {
  resourceList: any;
  selectedList: any = [];
  toggleSelectAll: boolean = false;
  toggleSectionBox: boolean = false;
  @Input() isLProjectTableRemovedList: boolean = false;
  @Output() selectedResource = new EventEmitter<Resource>();

  constructor(
    private resourceService: ResourceService,
    private projectService: ProjectService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isLProjectTableRemovedList'] &&
      changes['isLProjectTableRemovedList'].currentValue
    ) {
      console.log('m updatingggg');
      let updatedList = this.projectService.getSelectedResource();
      let result = this.selectedList.filter(
        (list: any) => !updatedList.includes(list)
      );
      result.map((list: any) => {
        list.ischecked = false;
      });
    }
  }
  ngOnInit(): void {
    this.resourceList = this.resourceService.getResourceList().subscribe({
      next: (data) => (this.resourceList = data),
      error: (err) => console.error(err),
      complete: () => {
        let formattedList: any = [];
        this.resourceList.map((resource: any) => {
          let obj = {
            resourceID: resource.resourceID,
            resourceName: resource.resourceName,
            ischecked: false,
          };
          formattedList.push(obj);
        });
        this.resourceList = formattedList;
      },
    });
    //  console.log(this.resourceList)
  }

  handleSubmittion(resource: any) {
    // console.log('add to list');
    // console.log(resource.ischecked);
    this.selectedList.push(resource);

    // this.projectService.addResourceToList(resource);
  }

  handleRemove(resource: any) {
    console.log('remove from list');
    console.log(resource.ischecked);
    let index = this.selectedList.findIndex(
      (item: any) => item.resourceID === resource.resourceID
    );
    this.selectedList.splice(index, 1);
    // this.projectService.removeResourceToList(resource);
  }
  sendToProjec() {
    this.projectService.addAll(this.selectedList);
  }

  selectAll() {
    this.toggleSelectAll = true;
    this.resourceList.forEach((item: any) => (item.selected = true));
  }

  deselectAll() {
    this.toggleSelectAll = false;
    this.resourceList.forEach((item: any) => (item.selected = false));
  }
}
