import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project-service/project.service';
import { Resource } from '../resource/resource';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projectList: any = [];
  nameList: string[] = [];
  isDropdownOpend: boolean = false;
  isCreatedProjectWindowOpend: boolean = false;
  currentProject: any;
  createdProjectName: string = '';
  createdProjectErr: string = '';
  resourceList: any;
  isListUpdated:boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjectList().subscribe({
      next: (data) => (this.projectList = data),
      error: (error) =>
        console.log('Error when fetching projectList: ' + error),
      complete: () => {
        if (this.projectList.length !== 0) {
          this.projectList.map((pro: any) =>
            this.nameList.push(pro.projectName)
          
          );
          this.currentProject = this.projectList[0];
          // console.log(this.currentProject)
        }
      }
    });
  }

  createProject() {
    if (!this.nameList.includes(this.createdProjectName)) {
      console.log(this.createdProjectName);
      this.projectService.createProject(this.createdProjectName);
      this.nameList.push(this.createdProjectName);
    } else {
      this.createdProjectErr = 'Name has existed! Try a new one';
    }
    this.isCreatedProjectWindowOpend = false;
  }

  toggleCretedProjectWindow() {
    this.isCreatedProjectWindowOpend = !this.isCreatedProjectWindowOpend;
  }

  toggleDropdown() {
    this.isDropdownOpend = !this.isDropdownOpend;
    // console.log(this.isDropdownOpend);
  }

  selectProject(name: string) {
    this.currentProject = this.projectList.find(
      (project: any) => project.projectName === name
    );
    console.log('current project', this.currentProject);
    this.isDropdownOpend = false;
  }

  handleBooleanValue(value: boolean) {
    console.log('Received boolean value:', value);
    this.isListUpdated = true;
  }
}
