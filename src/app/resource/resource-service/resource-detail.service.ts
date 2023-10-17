import { Injectable } from '@angular/core';
import { ResourceDetail } from '../resourceDetail';

@Injectable({
  providedIn: 'root',
})
export class ResourceDetailService {
  resourceDetailList: ResourceDetail[] = [
    new ResourceDetail(1234, 1234, 'price', '$10/oz', 'Jone Doe'),
  ];
  constructor() {}

  getResourceDetailList() {
    return this.resourceDetailList;
  }

  addResourceDetail(newResourceDetail: ResourceDetail) {
    this.resourceDetailList.push(newResourceDetail);
  }

  editResourceDetailName(index: number, name: string) {
    this.resourceDetailList[index].setDetailName(name);
  }

  editResourceDetailDescription(index: number, des: string) {
    this.resourceDetailList[index].setDetailDescription(des);
  }
}
