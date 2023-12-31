import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';
import { catchError } from 'rxjs';
import { errorHandler } from 'src/app/shared/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getResourceList(query?: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    let getFilteredResourceRequest = this.http.get(
      `${SERVER_ADDRESS}api/resource/resource_name?q=${query}`,
      {
        headers: headers
      }
    );
    return getFilteredResourceRequest.pipe(catchError(errorHandler));
  }

  addResource(resourceID: number, resourceName: string) {
    const username = this.authService.getUsername();
    console.log('username in addResource(): ' + username);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    let postResourceRequest = this.http.post(
      `${SERVER_ADDRESS}api/resource/${username}/add_new_resource`,
      {
        resourceID: resourceID,
        resourceName: resourceName,
      },
      { headers: headers, responseType: 'text' }
    );
    return postResourceRequest.pipe(catchError(errorHandler));
  }

  getResourcesByProjectName(projectName:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    let getResourceByProjectNameRequest = this.http.get(
      `${SERVER_ADDRESS}api/resource/project_name?q=${projectName}`,
      { headers: headers}
    );
    return getResourceByProjectNameRequest.pipe(catchError(errorHandler));

  }
  getAddableResourceByProjectName(projectName:string){

     const headers = new HttpHeaders({
       Authorization: `Bearer ${this.authService.getToken()!}`,
     });
     let getAddableResourceByProjectNameRequest = this.http.get(
       `${SERVER_ADDRESS}api/resource/available/project_name?q=${projectName}`,
       { headers: headers }
     );
     return getAddableResourceByProjectNameRequest.pipe(
       catchError(errorHandler)
     );

  }

}
