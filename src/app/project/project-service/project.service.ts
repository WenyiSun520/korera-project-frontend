import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';
import { catchError, throwError } from 'rxjs';
import { errorHandler } from 'src/app/shared/errorHandler';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  private selectedResource: any = [];
  toggleSelectAll: boolean = false;
  currentProject:any;
  

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

  getSingleProjectByName(name:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    let getSingleProjectRequest = this.http.get(
      `${SERVER_ADDRESS}api/projects/${name}`,
      {
        headers: headers,
      }
    );

    return getSingleProjectRequest.pipe(catchError(errorHandler));
  }

  setCurrentProject(project:any){
    this.currentProject = project;
  }
  getCurrentProject(){
    return this.currentProject;
  }

  resetSelectedResource(){
      this.selectedResource.length = 0;
  }
  getSelectedResource() {
   
    return this.selectedResource;
  }

  createProject(name: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

   return this.http
     .post(
       `${SERVER_ADDRESS}api/projects/${this.authService.getUsername()}/add_new_project`,
       {
         projectName: name,
       },
       {
         headers: headers,
         responseType:"text"
       }
     )
     .pipe(catchError(errorHandler))
    
  }

  addAll(resouce: any[]) {
    //console.log(resouce)
    this.selectedResource.length = 0;
    this.selectedResource.push(...resouce);
  }
  removeAll(resource: any[]) {
    this.selectedResource = this.selectedResource.filter(
      (re: any) => !resource.includes(re)
    );
    // console.log(resource);
    // console.log('selectedResource: ', this.selectedResource);
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
        complete:()=> this.selectedResource.length = 0
      });
  }
}
