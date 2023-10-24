import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResourceService } from './resource-service/resource.service';
import { ResourceDetailService } from './resource-service/resource-detail.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

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
  // query: string = '';

  query = new FormControl('');
  options: string[] = ['stone', 'gem'];
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  constructor(
    private resourceService: ResourceService,
    private resourceDetailService: ResourceDetailService
  ) {}

  ngOnInit(): void {
    this.subscribeResoureList();
    this.filteredOptions = this.query.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    console.log(this.options);
    // this.subscribeResourceDetailMap();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  searchQuery() {
    this.subscribeResoureList();

    // this.subscribeResourceDetailMap();
  }

  autoFetchAll(event?: Event) {
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement.value;
      if (value === '') {
        this.subscribeResoureList();
      }
    }
  }

  subscribeResoureList() {
    let query: any;
    if (this.query.value !== undefined) {
      query = this.query.value;
      this.addSearchQuery();
    }
    this.resourceList = this.resourceService.getResourceList(query).subscribe({
      next: (data) => (this.resourceList = data),
      error: (err) => console.error(err),
      complete: () => {
        this.resourceList.sort((a: any, b: any) => a.resourceID - b.resourceID);
        //console.log(this.resourceList)
        this.subscribeResourceDetailMap();
      },
    });
  }
  subscribeResourceDetailMap() {
    let query: any = '';
    if (this.query.value !== undefined) {
      query = this.query.value;
    }
    this.resourceDetailService.getResourceDetailMap(query).subscribe({
      next: (data: any) => {
        let formattedMap: Map<any, any[]> = new Map<any, any[]>();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const list: any[] = data[key];
            this.resourceList.map((item: any) => {
              if (
                !list.find(
                  (resource: any) => resource.resourceID === item.resourceID
                )
              ) {
                let obj = {
                  detailID: -1,
                  detailName: key,
                  detailDescription: 'n/a',
                  created_date: '',
                  latest_modified_by: 'null',
                  latest_updated: '',
                  resourceID: item.resourceID,
                  resourceName: item.resourceName,
                };
                list.push(obj);
              }
            });
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
        // console.log(this.resourceDetailMap);
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

  reloadResourceList(isUpdated: boolean) {
    if (isUpdated === true) {
      this.ngOnInit();
    }
  }

  addSearchQuery() {
    const newQuery = this.query.value?.trim();
    if (newQuery && !this.options.includes(newQuery)) {
      this.options.push(newQuery);
    }
  }

}
