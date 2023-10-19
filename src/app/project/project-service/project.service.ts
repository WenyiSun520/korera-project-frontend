import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';
import { catchError, throwError } from 'rxjs';
import { errorHandler } from 'src/app/shared/errorHandler';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectList: any = [];
  selectedResource: any = [];
  toggleSelectAll: boolean = false;
  

  constructor(private authService: AuthService, private http: HttpClient) {}

  getProjectList() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    let getProjectsRequest = this.http.get(
      `${SERVER_ADDRESS}api/projects/search_by_username?username=${this.authService.getUsername()}`,
      {
        headers: headers,
      }
    );

    return getProjectsRequest.pipe(catchError(errorHandler));
  }

  getSelectedResource() {
    return this.selectedResource;
  }

  createProject(name: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    this.http
      .post(
        `${SERVER_ADDRESS}api/projects/${this.authService.getUsername()}/add_new_project`,
        {
          projectName: name,
        },
        {
          headers: headers,
        }
      )
      .subscribe({
        error: (error) => console.log(error),
      });
  }

  addAll(resouce: any[]) {
    //console.log(resouce)
    this.selectedResource.push(...resouce);
  }
  removeAll(resource: any[]) {
    this.selectedResource = this.selectedResource.filter(
      (re: any) => !resource.includes(re)
    );
    console.log('selectedResource: ', this.selectedResource);
  }

  addResourceToProject(currentProject: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    console.log(currentProject.projectName);
    console.log(currentProject.projectId);

    let resourceArr: any = [];
    this.selectedResource.map((resource: any) => {
      let obj = {
        resourceName: resource.resourceName,
      };
      resourceArr.push(obj);
    });

    this.http
      .post(
        `${SERVER_ADDRESS}api/resource/${this.authService.getUsername()}/${
          currentProject.projectId
        }/add_resource`,
        resourceArr,
        {
          headers: headers,
        }
      )
      .subscribe({
        error: (error) => console.log(error),
      });
  }
}
