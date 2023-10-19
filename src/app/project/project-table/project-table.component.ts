import { Component,Input ,EventEmitter, Output} from '@angular/core';
import { ProjectService } from '../project-service/project.service';
import { Resource } from 'src/app/resource/resource';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
})
export class ProjectTableComponent {
  @Input() resourceList: any[] = [];
  deletedList:any[] =[];
  @Output() submitDeletedList = new EventEmitter<Resource[]>();

  constructor(private projectService: ProjectService) {}

  addToDeletedList(resource: Resource) {
    this.deletedList.push(resource);
  }
  handleDeletion() {
    this.submitDeletedList.emit(this.deletedList)
    console.log(this.submitDeletedList)
     console.log(this.deletedList);
  }
}
