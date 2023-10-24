import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';
import { Resource } from 'src/app/resource/resource';
import { ProjectService } from '../project-service/project.service';
import { Event } from '@angular/router';


@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css'],
})
export class ResourceTableComponent {
  selectedList: any = [];
  toggleSectionBox: boolean = false;
  @Input() currentProject: any;
  @Input() addableResourcesOfCurrentProject: any;
  @Input() isLProjectTableRemovedList: boolean = false;
  @Output() selectedResource = new EventEmitter<Resource>();

  constructor(
    private resourceService: ResourceService,
    private projectService: ProjectService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isLProjectTableRemovedList'] &&
      changes['isLProjectTableRemovedList'].currentValue
    ) {
      // console.log('m updatingggg');
      let updatedList = this.projectService.getSelectedResource();
      let result = this.selectedList.filter(
        (list: any) => !updatedList.includes(list)
      );
      this.selectedList = this.selectedList.filter((list: any) =>
        updatedList.includes(list)
      );
      result.map((list: any) => {
        list.ischecked = false;
      });
    }
  }

  handleSubmittion(resource: any) {
    resource.ischecked = true;
    this.selectedList.push(resource);
    console.log(resource.ischecked);
        console.log(this.selectedList);
  }

  handleRemove(resource: any) {
     resource.ischecked = false;

    console.log(resource.ischecked);
    let index = this.selectedList.findIndex(
      (item: any) => item.resourceID === resource.resourceID
    );
    this.selectedList.splice(index, 1);
    console.log(this.selectedList)
  }

  sendToProjec() {
    this.projectService.addAll(this.selectedList);
    console.log(this.selectedList)
  }

  checkAll(evt: any) {
    console.log("check all")
    this.addableResourcesOfCurrentProject.forEach(
      (c: any) => {c.ischecked = !evt.target.checked}
    );
    this.selectedList.push(...this.addableResourcesOfCurrentProject)
        this.toggleSectionBox = false;
         console.log(this.selectedList);
  }

  uncheckAll(evt: any) {
      console.log('decheck all');
    this.addableResourcesOfCurrentProject.forEach(
      (c: any) => (c.ischecked = evt.target.checked)
    );
    this.selectedList.length = 0;
    this.toggleSectionBox = false;
     console.log(this.selectedList);
  }
}
