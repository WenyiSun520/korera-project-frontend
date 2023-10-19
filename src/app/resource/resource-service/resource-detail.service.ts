import { Injectable } from '@angular/core';
import { ResourceDetail } from '../resourceDetail';
import { ResourceService } from './resource.service';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';
import { catchError} from 'rxjs';
import { errorHandler } from 'src/app/shared/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class ResourceDetailService {
  id: number = 1235;
  resourceDetailList: ResourceDetail[] = [];
  constructor(private authService:AuthService, private http:HttpClient) {}

  getResourceDetailMap() {

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()!}`,
      });
    let getResourceDetailRequest = this.http.get(
      `${SERVER_ADDRESS}api/resource_detail/`,
      { headers: headers }
    );
    return getResourceDetailRequest.pipe(catchError(errorHandler));
  }

  addResourceDetail(newResourceDetailName: string) {
    // let resourceList = this.resourceService.getResourceList();
    // let detail = new ResourceDetail(
    //   ++this.id,
    //   newResourceDetailName,
    //   'n/a',
    //   'Joe Doe'
    // );
    // this.resourceDetailList.push(detail);
    // for (let i = 0; i < resourceList.length; i++) {
    //   detail.updateResourceIdMap(resourceList[i].id, 'n/a');
    //   this.resourceService.addDetailToResource(detail);
    // }
  }


  editResourceDetailName(index: number, name: string) {
    this.resourceDetailList[index].setDetailName(name);
  }

  editResourceDetailDescription(index: number, des: string) {
    let resourceDetail = this.resourceDetailList[index];
    let map = resourceDetail.resourceIdMap;

    map.forEach((value,key) => {
     map.set(key,des);
    });
  }
}
