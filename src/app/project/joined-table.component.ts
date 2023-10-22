import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './project-service/project.service';
import { ResourceService } from '../resource/resource-service/resource.service';

@Component({
  selector: 'app-joined-table',
  templateUrl: './joined-table.component.html',
  styleUrls: ['./joined-table.component.css'],
})
export class JoinedTableComponent {
  isListUpdated: boolean = false;
  isResourceSubmitted: any = this.projectService.getSelectedResource().length;
  currentProjectName: string = '';
  currentProject: any;
  addableResourcesOfCurrentProject: any;

  constructor(
    private activedRouter: ActivatedRoute,
    public projectService: ProjectService, // make it public so i can call it in deactive.guard
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    // console.log('ngonInit run');
    this.activedRouter.params.subscribe((param) => {
      this.currentProjectName = param['projectName'];
      //console.log('currentProjectName', this.currentProjectName);
      this.projectService
        .getSingleProjectByName(this.currentProjectName)
        .subscribe({
          next: (data) => {
            // console.log('fetch currentProject', data);
            this.currentProject = data;
          },
          error: (Err) => console.log(Err),
          complete: () =>
            this.subscribeGetAddableRescorceByProjectName(
              this.currentProjectName
            ),
        });
    });
  }

  subscribeGetAddableRescorceByProjectName(projectName:string) {
    console.log(projectName)
    this.resourceService
      .getAddableResourceByProjectName(projectName)
      .subscribe({
        next: (data: any) => {
          // console.log('data', data);
          this.addableResourcesOfCurrentProject = data;
        },
        error: (Err: any) => console.log(Err),
        complete: () => {
          let formattedList: any = [];
          this.addableResourcesOfCurrentProject.map((resource: any) => {
            let obj = {
              resourceID: resource.resourceID,
              resourceName: resource.resourceName,
              ischecked: false,
            };
            formattedList.push(obj);
          });
          this.addableResourcesOfCurrentProject = formattedList;
          console.log('formattedList completed');
        }
      });
  }
}
