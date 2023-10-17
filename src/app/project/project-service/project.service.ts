import { Injectable, OnInit } from '@angular/core';
import { Project } from '../project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements OnInit {
  projectNameList: string[] = [];
  projectList: Project[] = [
    new Project(1100, 'Project One', 'Jone Doe'),
    new Project(1101, 'Project Two', 'Jone Doe'),
    new Project(1102, 'Project Three', 'Jone Doe'),
    new Project(1103, 'Project Four', 'Jone Doe'),
  ];

  constructor() {
     this.projectList.map((proj) => this.projectNameList.push(proj.name));
  }
  ngOnInit(): void {
   
  }

  getProjectList() {
    return this.projectList;
  }
  getProjectNameList() {
    return this.projectNameList;
  }
}
