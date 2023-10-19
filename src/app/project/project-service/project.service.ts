import { Injectable, OnInit } from '@angular/core';
import { Project } from '../project';
import { Resource } from 'src/app/resource/resource';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements OnInit {
  projectNameList: string[] = [];
  selectedProject:Project;
  projectList: Project[] = [
    new Project(1100, 'Project One', 'Jone Doe'),
    new Project(1101, 'Project Two', 'Jone Doe'),
    new Project(1102, 'Project Three', 'Jone Doe'),
    new Project(1103, 'Project Four', 'Jone Doe'),
  ];

  constructor() {
     this.projectList.map((proj) => this.projectNameList.push(proj.name));
     this.selectedProject = this.projectList[0];
  }
  ngOnInit(): void {
   
  }

  getSelectedProject(){
    return this.selectedProject;
  }

  getProjectList() {
    return this.projectList;
  }
  getProjectNameList() {
    return this.projectNameList;
  }

  setSelectProject(name:string){
    let index = this.projectList.findIndex((pro)=>pro.name === name);
    this.selectedProject = this.projectList[index]
    return this.selectedProject;

  }
  addResourceToProject(resource:Resource){
    this.selectedProject.resourceList.push(resource);
    
  }
}
