import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';
import { catchError } from 'rxjs';
import { errorHandler } from 'src/app/shared/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class ResourceDetailService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getResourceDetailMap(query?: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    let getResourceDetailRequest = this.http.get(
      `${SERVER_ADDRESS}api/resource_detail/search_by_name?q=${query}`,
      { headers: headers }
    );
    return getResourceDetailRequest.pipe(catchError(errorHandler));
  }

  addResourceDetail(name: string, description: string, resourceId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    let addResourceDetailRequest = this.http.post(
      `${SERVER_ADDRESS}api/resource_detail/${this.authService.getUsername()}/${resourceId}/save_new_resource_detail`,
      {
        detailName: name,
        detailDescription: description,
      },
      { headers: headers, responseType: 'text' }
    );
    return addResourceDetailRequest.pipe(catchError(errorHandler));
  }

  editResourceDetail(resourceDetail: any, input: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    let editResourceDetailRequest = this.http.put(
      `${SERVER_ADDRESS}api/resource_detail/${this.authService.getUsername()}/${
        resourceDetail.resourceID
      }/update_resource_detail`,
      {
        resourceDetailID: resourceDetail.detailID,
        detailName: resourceDetail.detailName,
        detailDescription: input,
      },
      { headers: headers, responseType: 'text' }
    );
    return editResourceDetailRequest.pipe(catchError(errorHandler));
  }
}
