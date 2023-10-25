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

  constructor(private projectService: ProjectService, private router: Router) {}
  ngOnInit(): void {
    this.resourceList = this.projectService.getSelectedResource();
  }

  addOrRemoveReadyToDeletedList(e:any,resource:any){
    console.log(e.target.checked);
    if(e.target.checked){
       // console.log('add to ready list');
         this.readyToDeletedList.push(resource);
    }else{
     // console.log('remove from readt list');
      let index = this.readyToDeletedList.findIndex(
        (item: any) => item.resourceID === resource.resourceID
      );
      this.readyToDeletedList.splice(index, 1);
    }
   // console.log(this.readyToDeletedList);

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
    this.router.navigate([
      'project-list/formula',
      this.currentProject.projectName,
    ]);
  }
}
