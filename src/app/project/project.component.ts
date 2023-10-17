import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project-service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  nameList: any[] = [];
  isDropdownOpend: boolean = false;
  currSelction: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.nameList = this.projectService.getProjectNameList();
    console.log(this.nameList)
  }

  toggleDropdown() {
    this.isDropdownOpend = !this.isDropdownOpend;
    console.log(this.isDropdownOpend);
  }

  selectProject(name: string) {
    this.currSelction = name;
    console.log(this.currSelction);
    this.isDropdownOpend = false;
  }
}
