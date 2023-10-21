import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { errorHandler } from 'src/app/shared/errorHandler';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  private formulaList: any = [
    { field: 'price', type: 'NUMBER', formula: null },
    { field: 'price', type: 'FORMULA', formula: 'price * number' },
  ];
  constructor(private authService: AuthService, private http: HttpClient) {}

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

  getFormulaList(){
    return this.formulaList;
  }

  addFormulaToList(formula:any){
    this.formulaList.push(formula);
  }

  removeFormulaToList(index:number){
    this.formulaList.splice(index,1)
  }
}
