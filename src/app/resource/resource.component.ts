import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ResourceService } from './resource-service/resource.service';
import { ResourceDetailService } from './resource-service/resource-detail.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent {
  resourceList: any = [];
  resourceDetailMap: any = [];
  toggleOptions: boolean = false;
  toggleNewResourceInput: boolean = false;
  toggleNewColumnInput: boolean = false;
  query: string = '';

  constructor(
    private resourceService: ResourceService,
    private resourceDetailService: ResourceDetailService
  ) {}

  ngOnInit(): void {
    this.subscribeResoureList();
    this.subscribeResourceDetailMap();
  }
  searchQuery() {
    this.subscribeResoureList();
    this.subscribeResourceDetailMap();
  }

  subscribeResoureList() {
    this.resourceList = this.resourceService
      .getResourceList(this.query)
      .subscribe({
        next: (data) => (this.resourceList = data),
        error: (err) => console.error(err),
        complete: () => console.log('The request is completed!'),
      });
  }

  subscribeResourceDetailMap() {
    this.resourceDetailService.getResourceDetailMap(this.query).subscribe({
      next: (data: any) => {
        let formattedMap: Map<any, any[]> = new Map<any, any[]>();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const list: any[] = data[key];
            formattedMap.set(
              key,
              list.slice().sort((a: any, b: any) => a.resourceID - b.resourceID)
            );
          }
        }
        this.resourceDetailMap = formattedMap;
      },
      error: (err) => console.error(err),
      complete: () => {
        // console.log(this.resourceList);
        console.log('GetResourceDetailMap request is completed!');
      },
    });
  }

  handleToggleOptions() {
    this.toggleOptions = !this.toggleOptions;
  }

  openNewResourceInput() {
    this.toggleNewResourceInput = true;
    this.toggleOptions = false; // closed the options bar
  }
  closeNewResourceInput(isClosed: boolean) {
    this.toggleNewResourceInput = isClosed;
  }

  openNewColumnInput() {
    this.toggleNewColumnInput = true;
    this.toggleOptions = false;
  }

  closeNewColumnInput(isClosed: boolean) {
    this.toggleNewColumnInput = isClosed;
  }
}
