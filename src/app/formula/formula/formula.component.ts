import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';
import { Location } from '@angular/common';
import { FormulaService } from '../formula-service/formula.service';


@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent {
  toggleFormulsinput: string = '';
  toggleWarningMsg: boolean = false;
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
          // console.log(data instanceof Map);
          if (data instanceof Map) {
            this.tranformDataToMap(data);
          }
        },
        error: (Err) => console.log(Err),
        complete: () => {
          for (const [key, value] of this.formulaMap) {
            if (value[0].fieldType === 'FORMULA') {
              this.prepareFormulaCalculation(value);
            }
          }
        },
      });
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
    this.ngOnInit();
  }
  handleOpenEditFormulaBox(key: string, resourceID: number) {
    this.toggleFormulsinput = key + resourceID;
  }
  cancelFormulaInput() {
    this.toggleFormulsinput = '';
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
  toggleWarningMessage() {
    this.toggleWarningMsg = true;
    setTimeout(() => {
      this.toggleWarningMsg = false;
    }, 3000);
  }

  tranformDataToMap(data: any) {
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
        list.slice().sort((a: any, b: any) => a.resourceID - b.resourceID)
      );
    }
    this.formulaMap = data;
  }

  prepareFormulaCalculation(value: any) {
    let formulaArr = value[0].fieldValue.split(/\s+/);
    let operation = formulaArr[1];

    if (!isNaN(parseFloat(formulaArr[0]))) {
      // if the first varible is a constant
      let constant = formulaArr[0];
      console.log(constant);
      let listOne = this.formulaMap.get(formulaArr[1]);
      this.evaluateFormulaWithConstant(value, listOne, constant, operation);
    }

    if (!isNaN(parseFloat(formulaArr[2]))) {
      // if the second varible is a constant
      let listOne = this.formulaMap.get(formulaArr[0]);
      let constant = formulaArr[2];
      console.log(constant);
      this.evaluateFormulaWithConstant(value, listOne, constant, operation);
    }

    if (isNaN(parseFloat(formulaArr[0])) && isNaN(parseFloat(formulaArr[2]))) {
      let listOne = this.formulaMap.get(formulaArr[0]);
      let listTwo = this.formulaMap.get(formulaArr[2]);

      this.evaluateFormula(value, listOne, listTwo, operation);
    }
  }

  evaluateFormula(value: any, listOne: any, listTwo: any, operation: any) {
    let q = listOne;
    let P = listTwo;

    for (let i = 0; i < q.length; i++) {
      if (String(q[i].fieldValue) !== '' && String(P[i].fieldValue) !== '') {
        let formula: string = q[i].fieldValue + operation + P[i].fieldValue;

        value[i].fieldValue = eval(formula);
      } else {
        value[i].fieldValue = 'n/a';
      }
    }
  }

  evaluateFormulaWithConstant(
    value: any,
    listOne: any,
    constant: number,
    operation: any
  ) {
    let q = listOne;

    for (let i = 0; i < q.length; i++) {
      if (String(q[i].fieldValue) !== '') {
        let formula: string = q[i].fieldValue + operation + constant;
        console.log(formula);
        value[i].fieldValue = eval(formula);
      } else {
        value[i].fieldValue = 'n/a';
      }
    }
  }
}
