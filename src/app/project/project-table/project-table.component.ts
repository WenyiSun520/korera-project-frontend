import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../project-service/project.service';
import { Resource } from 'src/app/resource/resource';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
})
export class ProjectTableComponent {
  resourceList: any = [];
  readyToDeletedList: any = [];
  submitMsg: string = '';
  showMessage: boolean = false;
  @Input() currentProject: any;
  @Output() isListUpdated = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.resourceList = this.projectService.getSelectedResource();
    //console.log(this.resourceList);
  }

  addToReadyToDeletedList(resource: any) {
    this.readyToDeletedList.push(resource);
  }
  removedFromReadyToDeletedList(resource: any) {
    console.log('remove from list');
    console.log(resource.ischecked);
    let index = this.resourceList.findIndex(
      (item: any) => item.resourceID === resource.resourceID
    );
    this.resourceList.splice(index, 1);
  }

  deleteSelectedResource() {
    this.projectService.removeAll(this.readyToDeletedList);

    this.resourceList = this.projectService.getSelectedResource();
    this.isListUpdated.emit(true);
  }

  submitResource() {
    if (this.resourceList.length == 0) {
      this.showMessage = true;
      this.submitMsg = "You haven't add resource to the project!";
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    } else {
      if (this.currentProject !== undefined) {
        this.projectService.addResourceToProject(this.currentProject);
      } else {
        this.showMessage = true;
        this.submitMsg = "You haven't selected a project!";
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
    }
  }
}
