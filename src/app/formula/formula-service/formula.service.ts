import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { ProjectService } from 'src/app/project/project-service/project.service';
import { errorHandler } from 'src/app/shared/errorHandler';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  filteredType: any = [];
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private http: HttpClient
  ) {}

  getEnumType() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });
    return this.http
      .get(`${SERVER_ADDRESS}api/formula/enum-values`, {
        headers: headers,
      })
      .pipe(catchError(errorHandler));
  }

  getFormulaByProjectName(name: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    return this.http
      .get(
        `${SERVER_ADDRESS}api/formula/search-by-project?projectname=${name}`,
        {
          headers: headers,
        }
      )
       .pipe(
        map((data: any) => {
           let filteredMap = new Map<string, any[]>();
          if(this.filteredType.length !== 0){
          this.filteredType.forEach((key:any) => {
            if (data.has(key)) {
              filteredMap.set(key, data.get(key)!);
            }
          });
        }else{
          filteredMap = data;
        }

          return filteredMap;
        }),
        catchError(errorHandler)
      );

  }

  getFormulaTypeByProjectName(name: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    let getFormulaTypeRequest = this.http
      .get(
        `${SERVER_ADDRESS}api/formula/get-type/search-by-project?projectname=${name}`,
        {
          headers: headers,
        }
      )
      .pipe(catchError(errorHandler));
     
      return getFormulaTypeRequest;
  }

  addFormulaToList(formula: any) {
    let formattedFormula = this.formatFormulaHelper(formula.value);
    this.addFormulaToListHelper(formattedFormula).subscribe({
      complete: () => console.log('add formula to list completed!'),
    });
  }

  formatFormulaHelper(formula: any) {
    let projectId = this.projectService.getCurrentProject().projectId;
    // console.log(projectId);
    // console.log(formula);
    let formulaList: any = [];
    formula.map((item: any) => {
      let obj = {
        fieldName: item.field,
        fieldType: item.type,
        fieldValue: item.formula,
        project: {
          projectId: projectId,
        },
        resource: {
          resourceID: null,
        },
      };
      formulaList.push(obj);
    });
    return formulaList;
  }
  addFormulaToListHelper(formula: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()!}`,
    });

    return this.http.post(`${SERVER_ADDRESS}api/formula/save`, formula, {
      headers: headers,
      responseType: 'text',
    });
  }
  addFilterType(list:any){
  
    this.filteredType.push(...list)
      console.log(this.filteredType);

  }

  updateFieldValue(formulaId:number, value:string){
     const headers = new HttpHeaders({
       Authorization: `Bearer ${this.authService.getToken()!}`,
     });

    this.http.put(`${SERVER_ADDRESS}api/formula/update-value/${formulaId}/${value}`, {
       headers: headers,
     })
      .pipe(catchError(errorHandler))
     .subscribe({
        complete:()=>console.log("updateFieldValue completed! ", formulaId," ", value)
     })

  }



}
