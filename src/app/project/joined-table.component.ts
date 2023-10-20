import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './project-service/project.service';

@Component({
  selector: 'app-joined-table',
  templateUrl: './joined-table.component.html',
  styleUrls: ['./joined-table.component.css'],
})
export class JoinedTableComponent {
  isListUpdated: boolean = false;
  currentProjectName: string = '';
  currentProject: any;

  constructor(
    private activedRouter: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    console.log('ngonInit run');

    this.activedRouter.params.subscribe((param) => {
      this.currentProjectName = param['projectName'];
      console.log('currentProjectName', this.currentProjectName);
      this.projectService
        .getSingleProjectByName(this.currentProjectName)
        .subscribe({
          next: (data) => {
            console.log('data', data);
            this.currentProject = data;
          },
          error: (Err) => console.log(Err),
          complete: () => console.log('getSingleproject completed'),
        });
    });
   
  }

  handleBooleanValue(value: boolean) {
    console.log('Received boolean value:', value);
    this.isListUpdated = true;
  }
}
