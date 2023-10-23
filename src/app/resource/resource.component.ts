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
    // this.subscribeResourceDetailMap();
  }
  searchQuery() {
    this.subscribeResoureList();
   // this.subscribeResourceDetailMap();
  }

  subscribeResoureList() {
    this.resourceList = this.resourceService
      .getResourceList(this.query)
      .subscribe({
        next: (data) => (this.resourceList = data),
        error: (err) => console.error(err),
        complete: () => {
          this.resourceList.sort((a: any, b: any) => a.resourceID - b.resourceID)
        //  console.log(this.resourceList)
          this.subscribeResourceDetailMap()
        },
      });
  }
//  for(Long id:resourcesIdList){
//                 if(!checkedList.contains(id)){
//                    Resource resource = this.resourceRepository.getResourceByResourceID(id);
//                     ResourceDetailDTO empty = new ResourceDetailDTO(-1,type,"n/a",null,null,null,id,resource.getResourceName());
//                     list.add(empty);
//                 }
//            }
  subscribeResourceDetailMap() {
    this.resourceDetailService.getResourceDetailMap(this.query).subscribe({
      next: (data: any) => {
        let formattedMap: Map<any, any[]> = new Map<any, any[]>();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const list: any[] = data[key];
            this.resourceList.map((item:any)=>{
                if(!list.find((resource:any)=> resource.resourceID === item.resourceID)){
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
            })
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
