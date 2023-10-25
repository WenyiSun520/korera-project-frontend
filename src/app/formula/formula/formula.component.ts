import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/project/project-service/project.service';
import { FormulaService } from '../formula-service/formula.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent {
  toggleFormulsinput: string = '';
  formulaValueInput: string = '';
  currentProject: any;
  currentProjectName: string = '';
  resourceList: any = [];
  formulaMap: Map<string, any> = new Map<string, any>();

  constructor(
    private location: Location,
    private activedRouter: ActivatedRoute,
    private resourceService: ResourceService,
    private formulaService: FormulaService
  ) {}

  ngOnInit() {
    this.activedRouter.params.subscribe((param) => {
      this.currentProjectName = param['projectName'];
      // console.log('currentProjectName', this.currentProjectName);
      this.resourceService
        .getResourcesByProjectName(this.currentProjectName)
        .subscribe({
          next: (data) => {
            this.resourceList = data;
            this.resourceList.sort(function (a: any, b: any) {
              return a.resourceID - b.resourceID;
            });
          },
          error: (Err) => console.log(Err),
          complete: () => {
            this.getFormulaMap();
            this.formulaService.sampleResource = this.resourceList[0];
          },
        });
    });
  }

  getFormulaMap() {
    this.formulaService
      .getFormulaByProjectName(this.currentProjectName)
      .subscribe({
        next: (data: any) => {
          console.log(data instanceof Map);
          if (data instanceof Map) {
            for (const [key, value] of data) {
              this.formulaService.formulaTypeList.push(key);
              const list: any[] = value;
              const sample = list[0];
              this.resourceList.map((item: any) => {
                if (
                  list.find(
                    (formula: any) => formula.resourceId === item.resourceID
                  ) === undefined
                ) {
                  let obj = {
                    formulaId: -1,
                    fieldName: key,
                    fieldType: sample.fieldType,
                    fieldValue: ' ',
                    projectId: sample.projectId,
                    resourceId: item.resourceID,
                  };
                  list.push(obj);
                }
              });
              data.set(
                key,
                list
                  .slice()
                  .sort((a: any, b: any) => a.resourceID - b.resourceID)
              );
            }
            this.formulaMap = data;
          }
        },
        error: (Err) => console.log(Err),
      });
  }
  handleOpenEditFormulaBox(key: string, resourceID: number) {
    this.toggleFormulsinput = key + resourceID;
  }
  cancelFormulaInput() {
    this.toggleFormulsinput = '';
  }
  submitFieldValue(formulaId: number, formula: any) {
    if (this.formulaValueInput !== '' && formulaId !== -1) {
      this.formulaService
        .updateFieldValue(formulaId, this.formulaValueInput)
        .subscribe({
          error: () => console.log('error when upding field value'),
          complete: () => {
            formula.fieldValue = this.formulaValueInput;
            this.toggleFormulsinput = '';
            this.formulaValueInput = '';
          },
        });
    }
    if (this.formulaValueInput !== '' && formulaId === -1) {
      formula.fieldValue = this.formulaValueInput;
      this.formulaService.addFormulaToList([formula]);
      formula.fieldValue = this.formulaValueInput;
      this.toggleFormulsinput = '';
    }
  }
  goBack() {
    this.location.back();
  }
  sortByResourceId(list: any) {
    list.sort(function (a: any, b: any) {
      return a.resourceId - b.resourceId;
    });
    return list;
  }

  evaluateFormulaType() {
    // input the formula type and list
    // fetch the formula
    // fetch the list in formula
    // calculate the answer and save to a new attribute in each object 
    let quality = [1,2,3,4];
    let price = [4,3,2,1];
    let result=[];
    let formula: string = 'a * b';
    let a : number;
    let b : number;
    for(let i = 0 ; i < quality.length ; i++){
      if(String(quality[i]) !== "" && String(price[i])!== ""){
        a = quality[i];
        b = price[i];
        result[i] = eval(formula);

      }else{
        result[i] ="n/a"
      }
    console.log(result)
  }





  }
}
