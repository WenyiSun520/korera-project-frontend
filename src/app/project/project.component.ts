import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project-service/project.service';
import { Resource } from '../resource/resource';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  nameList: any[] = [];
  isDropdownOpend: boolean = false;
  currSelction: string = '';
  currProject: any;
  resourceList: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.nameList = this.projectService.getProjectNameList();
    this.currProject = this.projectService.getSelectedProject();
    this.currSelction = this.currProject.name;
    this.resourceList = this.currProject.resourceList;
  }

  toggleDropdown() {
    this.isDropdownOpend = !this.isDropdownOpend;
    console.log(this.isDropdownOpend);
  }

  selectProject(name: string) {
    this.currSelction = name;
    this.currProject = this.projectService.setSelectProject(name);
    this.isDropdownOpend = false;
  }

  addResourceToList(resource: Resource) {
    this.projectService.addResourceToProject(resource);
    this.resourceList = this.projectService.getSelectedProject().resourceList;
    // console.log(this.projectService.getSelectedProject().resourceList)
  }

  removedResourceFromList(deletedList:Resource[]) {
    for (let i = 0; i < deletedList.length; i++) {
      let id = deletedList[i].id;
      let index = this.resourceList.findIndex((re) => re.id === id);
      this.resourceList.splice(index, 1);
    }
  }
}
