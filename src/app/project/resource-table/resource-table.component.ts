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

    if (
      changes['addableResourcesOfCurrentProject'] &&
      changes['addableResourcesOfCurrentProject'].currentValue
    ) {
      this.addableResourcesOfCurrentProject =
        changes['resourcesOfCurrentProject'].currentValue;
    }
  }

  handleSubmittion(resource: any) {
    this.selectedList.push(resource);
    console.log(resource.ischecked);
  }

  handleRemove(resource: any) {
    console.log('remove from list');
    console.log(resource.ischecked);
    let index = this.selectedList.findIndex(
      (item: any) => item.resourceID === resource.resourceID
    );
    this.selectedList.splice(index, 1);
  }

  sendToProjec() {
    this.projectService.addAll(this.selectedList);
  }

  checkAll(evt: any) {
    this.addableResourcesOfCurrentProject.forEach(
      (c: any) => {c.ischecked = evt.target.checked}
    );
    this.selectedList.push(...this.addableResourcesOfCurrentProject)
        this.toggleSectionBox = false;
  }

  uncheckAll(evt: any) {
    this.addableResourcesOfCurrentProject.forEach(
      (c: any) => (c.ischecked = !evt.target.checked)
    );
    this.selectedList.length = 0;
    this.toggleSectionBox = false;
  }
}
