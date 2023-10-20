import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from 'src/app/project/project-service/project.service';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent {
  currentProject: any;
  currentProjectName: string = '';
  resourceList:any =[]

  constructor(
    private activedRouter: ActivatedRoute,
    private projectService: ProjectService,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    console.log('ngonInit run');

    this.activedRouter.params.subscribe((param) => {
      this.currentProjectName = param['projectName'];
      console.log('currentProjectName', this.currentProjectName);
      this.resourceService
        .getResourcesByProjectName(this.currentProjectName)
        .subscribe({
          next: (data) => {
            console.log('data', data);
            this.resourceList = data;
          },
          error: (Err) => console.log(Err),
          complete: () => console.log("resourceList, ",this.resourceList),
        });
    });
  }
}
