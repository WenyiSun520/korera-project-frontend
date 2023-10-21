import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../project-service/project.service';
import { Router } from '@angular/router';

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
  //@Output() isResourceSubmitted = new EventEmitter<boolean>();

  constructor(
    private projectService: ProjectService,
    private router:Router
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
        this.resourceList.length = 0;
       //this.isResourceSubmitted.emit(true)
      } else {
        this.showMessage = true;
        this.submitMsg = "You haven't selected a project!";
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
    }
  }

  navigateToFormula() {
   // console.log(this.currentProject);
   // console.log(this.projectService.getSelectedResource().length)

     //this.resourceList.length = 0;
     this.router.navigate([
       'project-list/formula',this.currentProject.projectName
     ]);

  }
}
