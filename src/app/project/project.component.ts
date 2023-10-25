import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project-service/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projectList: any = [];
  nameList: any = [];
  isDropdownOpend: boolean = false;
  isCreatedProjectWindowOpend: boolean = false;
  currentProject: any;
  createdProjectName: string = '';
  createdProjectErr: string = '';
  isListUpdated: boolean = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectService.getProjectList().subscribe({
      next: (data) => {
        this.nameList.length = 0;
        this.projectList.length = 0;
        this.projectList = data},
      error: (error) =>
        console.log('Error when fetching projectList: ' + error),
      complete: () => {
        if (this.projectList.length !== 0) {
          this.projectList.map((pro: any) =>
            this.nameList.push(pro.projectName)
          );
          this.currentProject = this.projectList[0];
          this.projectService.setCurrentProject(this.currentProject);
          this.router.navigate([
            'project-list/joined-table',
            this.currentProject.projectName,
          ]);
          // console.log(this.currentProject);
        }
      },
    });
    console.log('Component initialized');
  }

  createProject() {
    if (!this.nameList.includes(this.createdProjectName)) {
      console.log(this.createdProjectName);
      this.projectService.createProject(this.createdProjectName).subscribe({
       error: (error) => console.log(error),
       complete:()=>{
       this.ngOnInit()
       }
     });
      this.nameList.push(this.createdProjectName);
    } else {
      this.createdProjectErr = 'Name has existed! Try a new one';
    }
    this.isCreatedProjectWindowOpend = false;
  }

  toggleCretedProjectWindow() {
    this.isCreatedProjectWindowOpend = !this.isCreatedProjectWindowOpend;
        this.isDropdownOpend = false;
  }

  toggleDropdown() {
    this.isDropdownOpend = !this.isDropdownOpend;
      this.isCreatedProjectWindowOpend = false
    // console.log(this.isDropdownOpend);
  }

  selectProject(name: string) {
    if (name !== this.currentProject.projectName) {
      this.currentProject = this.projectList.find(
        (project: any) => project.projectName === name
      );
      console.log('current project', this.currentProject);
      this.projectService.setCurrentProject(this.currentProject);

      this.router.navigate([
        'project-list/joined-table',
        this.currentProject.projectName,
      ]);
    }
    this.isDropdownOpend = false;
  }
}
